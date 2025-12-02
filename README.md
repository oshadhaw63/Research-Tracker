# Research-Tracker
A comprehensive full-stack application for managing research projects in an educational institute. Built with Spring Boot backend and React frontend, featuring JWT authentication, role-based access control, and complete CRUD operations.
# Research Project Tracker

A comprehensive full-stack application for managing research projects in an educational institute. Built with Spring Boot backend and React frontend, featuring JWT authentication, role-based access control, and complete CRUD operations.

## 📋 Project Overview

This system enables educational institutions to efficiently manage academic research projects, track milestones, manage documents, and control access based on user roles.

## 🎯 Assignment Details

- **Backend Assignment**: Spring Boot REST API with JWT Authentication
- **Frontend Assignment**: React + TypeScript with Tailwind CSS
- **Course**: CMJD - Comprehensive Master Java Developer
- **Batch**: 110/111

## 🚀 Features

### Backend Features
- ✅ RESTful API with Spring Boot 3.2
- ✅ JWT-based authentication and authorization
- ✅ Role-based access control (ADMIN, PI, MEMBER, VIEWER)
- ✅ Spring Security configuration
- ✅ MySQL database integration with JPA
- ✅ BCrypt password encryption
- ✅ Complete CRUD operations
- ✅ Comprehensive error handling

### Frontend Features
- ✅ Modern React 18 with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Protected routes with role-based access
- ✅ JWT token management with auto-logout
- ✅ Context API for state management
- ✅ Axios interceptors for API calls
- ✅ Loading states and user feedback
- ✅ Clean and intuitive UI/UX

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL 8.0+
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **ORM**: Spring Data JPA

### Frontend
- **Framework**: React 18.2
- **Language**: TypeScript 4.9
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router DOM 6.21
- **HTTP Client**: Axios 1.6
- **State Management**: Context API

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

## 🚦 Getting Started

### Prerequisites
- Java Development Kit (JDK) 17+
- Maven 3.6+
- Node.js 16+
- MySQL 8.0+
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Configure MySQL database**
   - Update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```

3. **Build and run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   
   Backend will start on **http://localhost:8080**

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   Frontend will start on **http://localhost:3000**

## 👥 User Roles & Permissions

| Role | Description | Permissions |
|------|-------------|-------------|
| **ADMIN** | System Administrator | Full access to all features, manage users |
| **PI** | Principal Investigator | Create/manage projects, manage team members |
| **MEMBER** | Research Member | Create milestones, upload documents |
| **VIEWER** | Read-only User | View public project data |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create project (PI/ADMIN)
- `PUT /api/projects/{id}` - Update project (PI/ADMIN)
- `PATCH /api/projects/{id}/status` - Update status (PI/ADMIN)
- `DELETE /api/projects/{id}` - Delete project (ADMIN)

### Milestones
- `GET /api/projects/{id}/milestones` - Get project milestones
- `POST /api/projects/{id}/milestones` - Create milestone
- `PUT /api/milestones/{id}` - Update milestone
- `DELETE /api/milestones/{id}` - Delete milestone

### Documents
- `GET /api/projects/{id}/documents` - Get project documents
- `POST /api/projects/{id}/documents` - Upload document
- `DELETE /api/documents/{id}` - Delete document

### Users
- `GET /api/users` - Get all users (ADMIN)
- `GET /api/users/{id}` - Get user by ID
- `DELETE /api/users/{id}` - Delete user (ADMIN)

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Token included in all subsequent API requests
5. Backend validates token on each request
6. Auto-logout on token expiration

## 🎨 UI Screenshots

The application features:
- Clean, modern interface with Tailwind CSS
- Responsive design for all screen sizes
- Role-based navigation and features
- Loading states and error handling
- Intuitive forms with validation

## 📝 Database Schema

### Users Table
- id (PK), username, password, fullName, role, createdAt

### Projects Table
- id (PK), title, summary, status, pi_id (FK), tags, startDate, endDate, createdAt, updatedAt

### Milestones Table
- id (PK), project_id (FK), title, description, dueDate, isCompleted, created_by (FK)

### Documents Table
- id (PK), project_id (FK), title, description, urlOrPath, uploaded_by (FK), uploadedAt

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing
1. Start both backend and frontend
2. Register a new user
3. Login with credentials
4. Test CRUD operations
5. Verify role-based access

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:
- Database URL, username, password
- JWT secret and expiration
- Server port
- Logging levels

### Frontend Configuration
Edit `frontend/src/services/api.ts`:
- API base URL
- Request timeout
- Headers

## 📚 Documentation

- [Backend README](backend/README.md) - Detailed backend documentation
- [Frontend README](frontend/README.md) - Detailed frontend documentation

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check MySQL is running
- Verify database credentials
- Ensure port 8080 is available

**Frontend won't connect:**
- Verify backend is running
- Check API URL in frontend config
- Review browser console for CORS errors

**Authentication fails:**
- Check JWT secret matches in backend
- Verify token format and expiration
- Clear localStorage and try again

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
mvn clean package
java -jar target/research-tracker-1.0.0.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Serve the build folder with your preferred web server
```

## 📋 Assignment Requirements Checklist

### Backend ✅
- [x] Spring Boot project setup
- [x] MySQL database integration
- [x] Spring Security with JWT
- [x] Entity classes with relationships
- [x] JPA repositories
- [x] Service layer implementation
- [x] RESTful controllers
- [x] Role-based authorization
- [x] Password encryption
- [x] Error handling
- [x] Clean code with comments

### Frontend ✅
- [x] React + TypeScript setup
- [x] React Router for SPA navigation
- [x] Axios for API communication
- [x] Context API for state management
- [x] Tailwind CSS for styling
- [x] Authentication pages (Login/Register)
- [x] Protected routes
- [x] Role-based access
- [x] CRUD operations
- [x] Responsive design
- [x] Loading states
- [x] Form validation
- [x] JWT token management

## 👨‍💻 Author

**CMJD Batch 110/111**

## 📄 License

This project is for educational purposes as part of the CMJD coursework.

## 🙏 Acknowledgments

- CMJD course instructors
- Spring Boot documentation
- React documentation
- Tailwind CSS team

---

**Note**: This is a coursework project demonstrating full-stack development skills with Spring Boot and React.
