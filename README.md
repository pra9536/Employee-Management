# Employee Management System - Backend

A full-stack Employee Management System built with Spring Boot, MySQL, and React.js.

## Tech Stack
- Java 17
- Spring Boot 4.0
- Spring Data JPA + Hibernate
- MySQL 8.0
- Maven
- Lombok

## Features
- REST API with full CRUD operations
- Pagination and sorting support
- Search employees by name or department
- Input validation and error handling
- CORS configured for React frontend

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/employees | Get all employees (with pagination) |
| GET | /api/employees/{id} | Get employee by ID |
| POST | /api/employees | Create new employee |
| PUT | /api/employees/{id} | Update employee |
| DELETE | /api/employees/{id} | Delete employee |

## How to Run

### Prerequisites
- Java 17+
- MySQL 8.0+
- Maven

### Database Setup
```sql
CREATE DATABASE employee_db;
```

### Configuration
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=your_password
```

### Run the Application
```bash
mvn spring-boot:run
```
Server starts at `http://localhost:8080`

# Employee Management System - Frontend

React.js frontend for Employee Management System built with Vite.

## Tech Stack
- React.js 18
- Vite
- Axios
- React Router DOM
- React Toastify

## Features
- View all employees with pagination
- Search employees by name or department
- Add new employee with validation
- Edit existing employee
- Delete employee with confirmation
- Success/Error toast notifications

## How to Run

### Prerequisites
- Node.js 16+
- Backend server running on port 8080

### Installation
```bash
npm install
```

### Run the Application
```bash
npm run dev
```
App starts at `http://localhost:5173`

## Screenshots
<img width="1919" height="983" alt="image" src="https://github.com/pra9536/Employee-Management/blob/main/employee-frontend/src/assets/1.png" />
<img width="1919" height="983" alt="image" src="https://github.com/pra9536/Employee-Management/blob/main/employee-frontend/src/assets/2.png" />
