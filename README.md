# Task Manager Application

## Overview

This project is a full-stack web application for managing user tasks. It is built using the latest web development technologies and follows the Model-View-Controller (MVC) design pattern for ease of maintenance and reusability.

## Frontend

### Technologies
- **React (Hooks)**: Developed with React 18 and hooks for state management.
- **Vite**: Used as the build tool for fast and efficient development.
- **Yarn**: Package manager for managing dependencies.
- **Material UI**: Utilized for styled components, ensuring a modern and responsive user interface.

### Installation and Running

To get the frontend up and running, follow these steps:

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn dev
   ```

## Backend

### Technologies
- **TypeScript**: Used for type safety and modern JavaScript features.
- **Node.js**: JavaScript runtime for server-side code.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MySQL**: Relational database for storing tasks.
- **Sequelize**: Promise-based Node.js ORM for MySQL, providing easy database interactions.
- **MVC Design Pattern**: Ensures the codebase is modular, maintainable, and reusable.

### Installation and Running

To set up and run the backend server, follow these steps:

1. Navigate to the `server` directory.

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start:dev
   ```

4. For production, start the server:
   ```bash
   yarn start
   ```

## Project Structure

The project follows the MVC design pattern both in the frontend and backend:

### Frontend (React)
- **Model**: Represents the application state.
- **View**: Components built with Material UI for the user interface.
- **Controller**: React hooks and state management logic.

### Backend (Node.js with Express)
- **Model**: Sequelize models for database entities.
- **View**: API responses sent to the frontend.
- **Controller**: Express route handlers for processing client requests.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any changes or suggestions.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
