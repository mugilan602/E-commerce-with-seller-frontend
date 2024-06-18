# Use the official Node.js LTS version as the base image
FROM node:14

# Create and change to the app directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Clear npm cache (optional)
RUN npm cache clean --force

# Install app dependencies
RUN npm install --quiet --production=false

# Copy the rest of the application code to the working directory
COPY . .

# Install ESLint and plugins (if needed)
# RUN npm install eslint eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-react-hooks --save-dev

# Optionally, create an ESLint configuration file (if needed)
# RUN echo '{ ... }' > .eslintrc.json

# Run ESLint (if needed)
# RUN npx eslint . || true

# Debugging: Output npm logs for troubleshooting
RUN npm --version
RUN node --version
RUN npm config list
RUN npm list

# Run the build command
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
