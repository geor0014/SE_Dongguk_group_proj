# Docker file for react frontend

# Use official Node.js image 
FROM node:21.7.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json 
COPY package*.json ./

# Install dependencies
RUN npm install 

# install axios and react-router-dom
RUN npm install axios react-router-dom --save

# Copy rest of the files
COPY . .


# Expose port 3000
EXPOSE 3000

# Serve the app
CMD [ "npm", "start" ]