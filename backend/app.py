from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask import url_for
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import os
from datetime import datetime
import sys

from werkzeug.utils import secure_filename


# Initialize the Flask App
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret_key')  # Change this to a secure secret key
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

class Base(DeclarativeBase):
    pass

CORS(app)

db = SQLAlchemy(
    app, model_class=Base
)

bcrypt = Bcrypt(app)

jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    images = db.relationship('Image', backref='owner', lazy=True)

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    keywords = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    sender_username = db.Column(db.String(150), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipient_username = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False,default=datetime.utcnow)
    is_read = db.Column(db.Boolean, nullable=False, default=False)
    
    
with app.app_context():
    db.create_all()


@app.route('/send_message', methods=['POST'])
@jwt_required()
def send_message():
    data = request.get_json()
    sender_identity = get_jwt_identity()
    sender =  User.query.filter_by(username=sender_identity['username']).first()
    recipient = User.query.filter_by(username=data['recipient_username']).first()
    if not recipient:
        return jsonify({'message':'Recipient not fount'}),404 
    new_message = Message(sender_id=sender.id, recipient_id=recipient.id, content=data['content'], sender_username=sender.username, recipient_username=recipient.username)
    db.session.add(new_message)
    db.session.commit()
    return jsonify({'message':'Message sent successfully'}), 201
    

@app.route('/inbox',methods=['GET'])
@jwt_required()
def inbox():
    user_identity = get_jwt_identity()
    user = User.query.filter_by(username=user_identity['username']).first()
    messages = Message.query.filter_by(recipient_id=user.id).order_by(Message.timestamp.desc()).all()
    messages_data = [
        {
            'id': message.id,
            'sender':  message.sender_username,
            'content': message.content,
            'timestamp': message.timestamp,
            'is_read': message.is_read
        }
        for message in messages
    ]
    return jsonify(messages=messages_data), 200

@app.route('/read_message/<int:message_id>', methods=['POST'])
@jwt_required()
def read_message(message_id):
    user_identity = get_jwt_identity()
    user = User.query.filter_by(username=user_identity['username']).first()
    message = Message.query.get_or_404(message_id)
    if message.recipient_id != user.id:
        return jsonify({'message':'Permission denied'}), 403
    message.is_read = True
    db.session.commit()
    return jsonify({'message':'Message marked as read'}), 200

@app.route('/delete_message/<int:message_id>', methods=['POST'])
@jwt_required()
def delete_message(message_id):
    user_identity = get_jwt_identity()
    user = User.query.filter_by(username=user_identity['username']).first()
    message = Message.query.get_or_404(message_id)
    if message.recipient_id != user.id:
        return jsonify({'message':'Permission denied'}), 403
    db.session.delete(message)
    db.session.commit()
    return jsonify({'message':'Message deleted successfully'}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message='User created successfully!'), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        access_token = create_access_token(identity={'username': user.username})
        return jsonify(user={'access_token': access_token, 'username': user.username})
    else:
        return jsonify(message='Invalid creadentials'), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
    

@app.route('/')
def home():
    return jsonify(message='Hello World!')


@app.route('/users', )
def users():
    users = User.query.all()
    return jsonify(users=[user.username for user in users])

@app.route('/upload', methods=['POST'])
@jwt_required()
def upload():
    if 'image' not in request.files:
        return jsonify(message='No file part'), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify(message='No selected file'), 400
    
    
    description = request.headers.get('description')
    keywords = request.headers.get('keywords')
    
    if file: 
        filename = secure_filename(file.filename)   
        user_identity = get_jwt_identity()
        user = User.query.filter_by(username=user_identity['username']).first()
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        new_image = Image(filename=filename, owner=user, description=description, keywords=keywords)
        db.session.add(new_image)
        db.session.commit()
        return jsonify(message='Image uploaded successfully!'), 201

@app.route('/images_for_user', methods=['GET'])
@jwt_required()
def images():
    user_identity = get_jwt_identity()
    user = User.query.filter_by(username=user_identity['username']).first()
    images = Image.query.filter_by(user_id=user.id).all()
    image_data = [
        {
        'id': image.id,
        'filename': image.filename,
        'description': image.description,
        'keywords': image.keywords,
        'url': url_for('get_image', image_name=image.filename, _external=True)
        } for image in images
    ]
    return jsonify(images=image_data)

@app.route('/images', methods=['GET'])
@jwt_required()
def all_images():
    images = Image.query.all()
    image_data = [
        {
        'id': image.id,
        'filename': image.filename,
        'url': url_for('get_image', image_name=image.filename, _external=True),
        'description': image.description,
        'keywords': image.keywords,
        } for image in images
    ]
    return jsonify(images=image_data)

@app.route('/images/<image_id>', methods=['DELETE'])
@jwt_required()
def delete_image(image_id):
    image = Image.query.get(image_id)
    if image:
        db.session.delete(image)
        db.session.commit()
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({'message': 'Image deleted successfully'}), 200
    else:
        return jsonify({'message': 'Image not found or not authorized to delete'}), 404

@app.route('/uploads/<image_name>')
# @jwt_required()
def get_image(image_name):
    return send_from_directory(app.config['UPLOAD_FOLDER'], image_name)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')