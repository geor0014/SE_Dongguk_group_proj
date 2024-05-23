# Dockerfile for Flask Backend

FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 5000

# Run the application
CMD ["python", "-u","app.py"]