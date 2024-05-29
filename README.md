# S&E Group  Project

This project is a web application consisting of a backend built with Flask, a frontend built with React, and a PostgreSQL database. The services are orchestrated using Docker Compose.

## Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

```plaintext
.
├── backend
│   ├── Dockerfile
│   ├── app.py
│   └── uploads
├── frontend
│   ├── Dockerfile
│   ├── public
│   ├── src
│   │   ├── App.js
│   │   └── ...
└── docker-compose.yml
```
## Getting started 
### Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
## Setting Up Environment Variables
Make sure to update the environment variables in the `docker-compose.yml` file as per your requirements.

## Building and Running the Services
```bash
docker-compose up --build
```
### This will start the following services:
- Flask backend at http://localhost:5000
- React frontend at http://localhost:3000
- PostgreSQL database at http://localhost:5433

## Accessing the Application
- The React frontend is accessible at http://localhost:3000
- The Flask backend is accessible at http://localhost:5000
- The PostgreSQL database is accessible at http://localhost:5433 with the following credentials:
  - Username: `admin`
  - Password: `password`

## Volumes 
### Docker volumes are used to persist data:
- `pgdata`: Persists PostgreSQL data at `./pgdata:/var/lib/postgresql/data`  
- `uploads`: Maps the uploads directory in the backend service to `./backend/uploads:/app/uploads`

## Stopping the Services
```bash
docker-compose down
```
## Stop and remove containers, networks, images, and volumes
```bash
docker-compose down --volumes
```

## Running the Services without Docker
### Backend (Flask)
- Install Python and pip if not already installed.
- navigate to the `backend` directory.
```bash
cd backend
```
- Create a virtual environment and activate it
```bash
python3 -m venv venv
source venv/bin/activate
```
- Install the dependencies
```bash
pip install -r requirements.txt
```
- Set the environment variables
```bash
export FLASK_ENV=development
export SQLALCHEMY_DATABASE_URI=postgresql://user:password@localhost:5433/app_db
export JWT_SECRET_KEY=your_jwt_secret_key
export UPLOAD_FOLDER=./uploads
```
- Run the Flask application
```bash
flask run --host=0.0.0.0 --port=5000
```

## Frontend (React)
- install Node.js and npm if not already installed.
- navigate to the `frontend` directory.
```bash
cd frontend
```
- Install the dependencies
```bash
npm install
```
- Set the environment variables by creating a `.env` file in the `frontend` directory.
```plaintext
REACT_APP_BACKEND_URL=http://localhost:5000
WDS_SOCKET_HOST=127.0.0.1 
```
- Run the React application
```bash
npm start
```

## Database (PostgreSQL)
- Install PostgreSQL if not already installed.
- Create a database named `app_db`.
```sh
psql -U postgres
CREATE DATABASE app_db;
CREATE USER user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE app_db TO user;
```
- Ensure the PostgreSQL server is running on port 5433
```sh
pg_ctl -D /usr/local/var/postgres start -o "-p 5433"
```
## Accessing the Application
- The React frontend is accessible at http://localhost:3000
- The Flask backend is accessible at http://localhost:5000
- The PostgreSQL database is accessible at http://localhost:5433 with the following credentials:
  - Username: `user`
  - Password: `password`

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

