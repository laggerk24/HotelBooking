# Project README

## Overview

This project is a web application built using a combination of modern technologies:

- **Backend:** Spring Boot
- **Database:** MySQL
- **Frontend:** React

The application employs robust security and data management practices to ensure secure and efficient handling of user data and authentication.

## Features

### Backend

- **Spring Boot**: Provides a powerful and flexible backend framework for building RESTful APIs.
- **MySQL**: Used as the relational database for storing application data.
- **Spring Security**: Implements authentication and authorization, including role-based access control with two distinct roles: `admin` and `normal user`.
- **Spring Data JPA**: Simplifies data access and management with a repository pattern.
- **JWT (JSON Web Tokens)**: Used for secure authentication and authorization.
- **Validation**: Backend APIs include validation mechanisms to ensure data integrity and correctness.

### Frontend

- **React**: Utilized for building a dynamic and responsive user interface.
- **API Consumption**: Interacts with backend APIs to fetch and display data.
- **Pagination**: Implemented to handle large datasets efficiently.
- **Local Storage**: JWT tokens and user ID are stored in local storage for maintaining user sessions.
- **Date Range Selection**: Incorporated `date-fns` and `react-date-range` for selecting periods and managing date ranges.
- **Route Protection**: Proper access control based on user roles, ensuring secure navigation.
- **Bootstrap**: Utilized for styling and responsive design elements.

## Getting Started

### Prerequisites

- Java 11 or higher
- MySQL 5.7 or higher
- Node.js and npm (for React development)
- Maven 3.6 or higher

### Setup

#### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/backend.git
   ```

2. **Configure MySQL:**

   Set up your MySQL database and configure the database connection properties in `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Build and run the Spring Boot application:**

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   Maven will handle the project dependencies and build the application.

#### Frontend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/frontend.git
   ```

2. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

3. **Run the React application:**

   ```bash
   npm start
   ```

   This will start the development server and open the application in your default browser.

## API Endpoints

The backend exposes several RESTful APIs. Below are examples of key endpoints:

- `POST /api/auth/login` - Authenticate a user and return a JWT token.
- `GET /api/users` - Retrieve a list of users (Admin role required).
- `GET /api/users/{id}` - Retrieve details of a specific user.
- `PUT /api/users/{id}` - Update user details (Admin role required).
- `DELETE /api/users/{id}` - Delete a user (Admin role required).

## Frontend

The React frontend provides the following features:

- **Authentication**: Login page for user authentication.
- **Dashboard**: Displays user data with pagination.
- **Date Range Picker**: Allows users to select date ranges.
- **Route Protection**: Restricts access to certain routes based on user roles.

## Technologies Used

- **Spring Boot**: Framework for backend development.
- **MySQL**: Database management system.
- **Spring Security**: Security framework for authentication and authorization.
- **Spring Data JPA**: Data access framework.
- **JWT**: Token-based authentication.
- **React**: Frontend library.
- **Bootstrap**: CSS framework for responsive design.
- **date-fns**: Date utility library.
- **react-date-range**: Date range picker component.
- **Maven**: Build and dependency management tool for the backend.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Make sure to follow the coding standards and provide clear commit messages.

## Contact

For any questions or support, please reach out to [laggerk24@gmail.com].
