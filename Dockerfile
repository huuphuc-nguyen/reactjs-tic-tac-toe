# Stage 1: Build the React app
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /react-app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the app with a lightweight HTTP server
FROM node:16-alpine

# Set the working directory for serving
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /react-app/build /app

# Expose the port for the app
EXPOSE 3004

#Serve the app using a lightweight HTTP server
CMD ["npx", "serve", "-s", "-l", "3004"]
