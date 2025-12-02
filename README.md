# Research Project Tracker

Full-stack application for managing academic research projects with role-based access control and JWT authentication.

## Overview

System for managing research projects, milestones, and documents in educational institutions.

## Features

### Backend
- RESTful API with Spring Boot 3.2
- JWT authentication and role-based authorization
- MySQL database with JPA/Hibernate
- Spring Security with BCrypt encryption

### Frontend
- React 18 with TypeScript
- Tailwind CSS responsive design
- Protected routes and JWT token management
- Context API for state management

## Technology Stack

**Backend:** Spring Boot 3.2, Java 17, MySQL 8.0+, Spring Security, JWT, Maven, JPA/Hibernate

**Frontend:** React 18.2, TypeScript 4.9, Tailwind CSS 3.3, React Router 6.21, Axios 1.6

## 📁 Project Structure

```
Assignment 2/
├── backend/                    # Spring Boot application
│   ├── src/
│   │   └── main/
│   │       ├── java/lk/ijse/cmjd/researchtracker/
│   │       │   ├── auth/           # Authentication module
│   │       │   ├── project/        # Project management
│   │       │   ├── milestone/      # Milestone management
│   │       │   ├── document/       # Document management
│   │       │   ├── user/           # User management
│   │       │   ├── config/         # Security configuration
│   │       │   └── common/         # Common DTOs & enums
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── README.md
│
└── frontend/                   # React application
    ├── src/
    │   ├── components/         # Reusable components
    │   ├── context/            # React Context
    │   ├── pages/              # Page components
    │   ├── services/           # API services
    │   ├── types/              # TypeScript types
    │   ├── App.tsx
    │   └── index.tsx
    ├── package.json
    └── README.md
```

## Setup

### Prerequisites
- JDK 17+, Maven 3.6+
- Node.js 16+, npm
- MySQL 8.0+

### Backend
```bash
cd backend
# Update application.properties with your MySQL credentials
mvn clean install
mvn spring-boot:run
```
Server runs on `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm start
```
App runs on `http://localhost:3000`

## User Roles

- **ADMIN** - Full system access, user management
- **PI** (Principal Investigator) - Create/manage projects and milestones
- **MEMBER** - Upload documents, view projects
- **VIEWER** - Read-only access

## API Endpoints

**Auth:** `/api/auth/signup`, `/api/auth/login`

**Projects:** GET/POST/PUT/DELETE `/api/projects`

**Milestones:** GET/POST/PUT/DELETE `/api/milestones`

**Documents:** GET/POST/DELETE `/api/documents`

**Users:** GET/DELETE `/api/users` (Admin only)

## Database Schema

**users:** id, username, password, fullName, role, createdAt

**projects:** id, title, summary, status, pi_id, tags, startDate, endDate, timestamps

**milestones:** id, project_id, title, description, dueDate, isCompleted, created_by

**documents:** id, project_id, title, description, urlOrPath, uploaded_by, uploadedAt

## License

Educational project for CMJD coursework.
