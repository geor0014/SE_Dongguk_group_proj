from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename



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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify(message='Hello World!')


@app.route('/testdb')
def testdb():
        # create multiple random users
    users = [
        User(username='user1', password=bcrypt.generate_password_hash('password').decode('utf-8')),
        User(username='user2', password=bcrypt.generate_password_hash('password').decode('utf-8')),
        User(username='user3', password=bcrypt.generate_password_hash('password').decode('utf-8')),
    ]
    #  createa multiple Images
    images = [
        Image(filename='image1.jpg', user_id=1),
        Image(filename='image2.jpg', user_id=1),
        Image(filename='image3.jpg', user_id=2),
        Image(filename='image4.jpg', user_id=2),
        Image(filename='image5.jpg', user_id=3),
        Image(filename='image6.jpg', user_id=3),
    ]
    
    db.session.bulk_save_objects(users)
    db.session.commit()
    db.session.bulk_save_objects(images)
    db.session.commit()
    
    queriedUsers = User.query.all()
    queriedImages = Image.query.all()
    
    # return the users in a json format
    return jsonify(users=[user.username for user in queriedUsers], images=[image.filename for image in queriedImages])


@app.route('/users')
def users():
    users = User.query.all()
    return jsonify(users=[user.username for user in users])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')