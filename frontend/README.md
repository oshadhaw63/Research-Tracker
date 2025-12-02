# Research Project Tracker - Frontend

A modern React + TypeScript frontend application for managing research projects with JWT authentication, role-based access control, and responsive design using Tailwind CSS.

## Technology Stack

- **Framework**: React 18.2
- **Language**: TypeScript 4.9
- **Routing**: React Router DOM 6.21
- **HTTP Client**: Axios 1.6
- **Styling**: Tailwind CSS 3.3
- **State Management**: Context API
- **Authentication**: JWT with localStorage

## Features

- ✅ JWT-based authentication with auto-logout on token expiration
- ✅ Role-based routing and component visibility
- ✅ Responsive design for mobile and desktop
- ✅ Protected routes with authorization
- ✅ Loading spinners and user feedback
- ✅ CRUD operations for Projects, Milestones, and Documents
- ✅ Clean and modern UI with Tailwind CSS
- ✅ Type-safe development with TypeScript

## Prerequisites

Before running this application, ensure you have:

- Node.js 16+ installed
- npm or yarn package manager
- Backend API running on `http://localhost:8080`

## Installation

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React and React DOM
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS
- jwt-decode

### 3. Start Development Server
```bash
npm start
```

The application will open at **http://localhost:3000**

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # Reusable components
│   │   ├── LoadingSpinner.tsx  # Loading indicator
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── ProtectedRoute.tsx  # Route authorization
│   ├── context/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── pages/                  # Page components
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── Login.tsx           # Login page
│   │   ├── Register.tsx        # Registration page
│   │   └── Projects.tsx        # Projects management
│   ├── services/               # API services
│   │   ├── api.ts              # Axios instance with interceptors
│   │   ├── authService.ts      # Authentication APIs
│   │   ├── projectService.ts   # Project APIs
│   │   ├── milestoneService.ts # Milestone APIs
│   │   ├── documentService.ts  # Document APIs
│   │   └── userService.ts      # User APIs
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main app component
│   ├── index.tsx               # Entry point
│   └── index.css               # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## API Configuration

The frontend connects to the backend API at `http://localhost:8080/api`.

To change this, update the `API_BASE_URL` in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Authentication Flow

1. **Registration/Login**
   - User submits credentials
   - Backend returns JWT token
   - Token stored in localStorage
   - User redirected to dashboard

2. **Protected Routes**
   - ProtectedRoute component checks authentication
   - Axios interceptor adds JWT to all requests
   - Auto-redirect to login on 401 errors

3. **Logout**
   - Token removed from localStorage
   - User redirected to login page

## User Roles

The application supports four user roles with different permissions:

| Role | Access Level |
|------|-------------|
| **ADMIN** | Full access to all features, user management |
| **PI** | Create/manage projects, milestones, documents |
| **MEMBER** | Create milestones, upload documents |
| **VIEWER** | Read-only access to projects |

## Pages Overview

### Login (`/login`)
- Username and password authentication
- Form validation
- Error handling
- Link to registration

### Register (`/register`)
- New user registration (default role: MEMBER)
- Password confirmation
- Form validation

### Dashboard (`/dashboard`)
- Welcome message with user info
- Quick access cards to features
- Role-based content display
- Getting started guide

### Projects (`/projects`)
- View all research projects
- Create new projects (PI/ADMIN only)
- Edit/delete projects (with role checks)
- Project cards with status badges
- Tags display

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

Tailwind CSS breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Color Scheme

Configured in `tailwind.config.js`:

- **Primary**: Blue (#3B82F6)
- **Secondary**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Warning**: Orange (#F59E0B)

## State Management

The application uses React Context API for global state:

### AuthContext
Provides authentication state and methods:
- `user`: Current user object
- `token`: JWT token
- `login()`: Store token and user data
- `logout()`: Clear authentication
- `isAuthenticated`: Boolean authentication status
- `hasRole()`: Check user role

Usage:
```typescript
const { user, isAuthenticated, logout } = useAuth();
```

## API Services

All API calls are centralized in service files:

```typescript
// Example: Fetch all projects
const response = await projectService.getAllProjects();
if (response.success) {
  setProjects(response.data);
}
```

### Axios Interceptors

**Request Interceptor**: Automatically adds JWT token to all requests
```typescript
config.headers.Authorization = `Bearer ${token}`;
```

**Response Interceptor**: Handles 401 errors and auto-logout
```typescript
if (error.response?.status === 401) {
  // Redirect to login
}
```

## Form Validation

All forms include:
- Required field validation
- Type checking with TypeScript
- Error message display
- Loading states during submission
- Success/error feedback

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

To serve the production build:
```bash
npm install -g serve
serve -s build
```

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

Access in code:
```typescript
const API_URL = process.env.REACT_APP_API_URL;
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
1. Stop the process using port 3000, OR
2. Start on a different port: `PORT=3001 npm start`

### API Connection Error
- Ensure backend is running on http://localhost:8080
- Check CORS configuration in backend
- Verify API_BASE_URL in `src/services/api.ts`

### Token Expired
- Tokens expire after 24 hours
- Application automatically redirects to login
- Re-login to get a new token

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Testing

Run the test suite:
```bash
npm test
```

## Future Enhancements

Planned features for future development:
- Project details page with milestones and documents
- Admin panel for user management
- File upload for documents
- Search and filter functionality
- Project analytics and charts
- Email notifications
- Dark mode support

## Contributing

This is an educational project for CMJD Batch 110/111.

## Author

**CMJD Batch 110/111**

## License

This project is for educational purposes.
