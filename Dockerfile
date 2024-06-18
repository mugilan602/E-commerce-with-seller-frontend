# Use the official Node.js 18 image as the base image
FROM node:18

# Create and change to the app directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install ESLint and plugins
RUN npm install eslint eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-react-hooks --save-dev

# Create an ESLint configuration file
RUN echo '{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "react-hooks"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/anchor-is-valid": "warn"
  }
}' > .eslintrc.json

# Run ESLint and ignore warnings
RUN npx eslint . || true

# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
