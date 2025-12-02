# Research Project Tracker - Backend

A Spring Boot backend application for managing research projects in an educational institute with JWT authentication and role-based access control.

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL 8.0+
- **Security**: Spring Security with JWT
- **Build Tool**: Maven
- **ORM**: Spring Data JPA (Hibernate)

## Features

- ✅ JWT-based authentication and authorization
- ✅ Role-based access control (ADMIN, PI, MEMBER, VIEWER)
- ✅ Complete CRUD operations for Projects, Milestones, and Documents
- ✅ User management
- ✅ RESTful API design
- ✅ MySQL database integration
- ✅ BCrypt password encryption
- ✅ CORS configuration for frontend integration

## Prerequisites

Before running this application, ensure you have:

- Java Development Kit (JDK) 17 or higher
- Maven 3.6+ installed
- MySQL 8.0+ installed and running
- Git for version control

## Database Setup

1. Install MySQL and start the MySQL server

2. Create a database (optional - the application will create it automatically):
   ```sql
   CREATE DATABASE research_tracker;
   ```

3. Update database credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

## Installation & Running

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd backend
```

### 2. Build the Project
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

Or run the JAR file:
```bash
java -jar target/research-tracker-1.0.0.jar
```

The application will start on **http://localhost:8080**

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login and get JWT token | Public |

### Project Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Authenticated |
| GET | `/api/projects/{id}` | Get project by ID | Authenticated |
| POST | `/api/projects` | Create new project | PI, ADMIN |
| PUT | `/api/projects/{id}` | Update project | PI, ADMIN |
| PATCH | `/api/projects/{id}/status` | Update project status | PI, ADMIN |
| DELETE | `/api/projects/{id}` | Delete project | ADMIN |

### Milestone Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects/{id}/milestones` | Get project milestones | Authenticated |
| POST | `/api/projects/{id}/milestones` | Create milestone | MEMBER, PI, ADMIN |
| PUT | `/api/milestones/{id}` | Update milestone | MEMBER, PI, ADMIN |
| DELETE | `/api/milestones/{id}` | Delete milestone | PI, ADMIN |

### Document Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects/{id}/documents` | Get project documents | Authenticated |
| POST | `/api/projects/{id}/documents` | Upload document | MEMBER, PI, ADMIN |
| DELETE | `/api/documents/{id}` | Delete document | PI, ADMIN |

### User Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users` | Get all users | ADMIN |
| GET | `/api/users/{id}` | Get user by ID | Authenticated |
| DELETE | `/api/users/{id}` | Delete user | ADMIN |

## Request & Response Examples

### Signup
**Request:**
```json
POST /api/auth/signup
{
  "username": "john.doe@example.com",
  "password": "securePassword123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "USR-1234567890",
    "username": "john.doe@example.com",
    "fullName": "John Doe",
    "role": "MEMBER"
  }
}
```

### Login
**Request:**
```json
POST /api/auth/login
{
  "username": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "USR-1234567890",
    "username": "john.doe@example.com",
    "fullName": "John Doe",
    "role": "MEMBER"
  }
}
```

### Create Project
**Request:**
```json
POST /api/projects
Authorization: Bearer <JWT_TOKEN>
{
  "title": "AI Research Project",
  "summary": "Research on machine learning algorithms",
  "status": "PLANNING",
  "piId": "USR-1234567890",
  "tags": "AI, machine learning, research",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31"
}
```

## User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **ADMIN** | System administrator | Full access to all resources |
| **PI** | Principal Investigator | Manage own projects and team members |
| **MEMBER** | Research member | Create milestones, upload documents |
| **VIEWER** | Read-only user | View public project data |

## Project Structure

```
backend/
├── src/
│   └── main/
│       ├── java/lk/ijse/cmjd/researchtracker/
│       │   ├── auth/              # Authentication module
│       │   ├── project/           # Project management
│       │   ├── milestone/         # Milestone management
│       │   ├── document/          # Document management
│       │   ├── user/              # User management
│       │   ├── config/            # Security & JWT config
│       │   └── common/            # Common DTOs & enums
│       └── resources/
│           └── application.properties
├── pom.xml
└── README.md
```

## Configuration

Key configuration properties in `application.properties`:

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/research_tracker
spring.datasource.username=root
spring.datasource.password=root

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=<your-secret-key>
jwt.expiration=86400000  # 24 hours
```

## Security

- All passwords are encrypted using BCrypt
- JWT tokens expire after 24 hours
- Stateless session management
- Role-based endpoint authorization
- CORS enabled for frontend integration

## Testing with Postman/cURL

1. **Register a user:**
   ```bash
   curl -X POST http://localhost:8080/api/auth/signup \
   -H "Content-Type: application/json" \
   -d '{"username":"test@example.com","password":"test123","fullName":"Test User"}'
   ```

2. **Login:**
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"username":"test@example.com","password":"test123"}'
   ```

3. **Access protected endpoint:**
   ```bash
   curl -X GET http://localhost:8080/api/projects \
   -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## Troubleshooting

### Port Already in Use
If port 8080 is already in use, change it in `application.properties`:
```properties
server.port=8081
```

### Database Connection Error
- Ensure MySQL is running
- Verify database credentials
- Check if the database exists or set `createDatabaseIfNotExist=true`

### JWT Token Invalid
- Ensure the token is included in the Authorization header
- Format: `Authorization: Bearer <token>`
- Check if token has expired (24-hour validity)

## Author

**CMJD Batch 110/111**

## License

This project is for educational purposes.
