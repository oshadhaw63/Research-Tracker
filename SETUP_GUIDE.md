# 🚀 Quick Setup Guide

Follow these steps to get your Research Project Tracker running:

## Step 1: Setup MySQL Database

1. Open MySQL Workbench or command line
2. Run the following command:
   ```sql
   CREATE DATABASE research_tracker;
   ```
3. Note your MySQL username and password

## Step 2: Configure Backend

1. Open `backend/src/main/resources/application.properties`
2. Update the following lines with your MySQL credentials:
   ```properties
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

## Step 3: Start Backend

Open a terminal in the `backend` folder and run:

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

✅ Backend should start on **http://localhost:8080**

You should see: `Started ResearchTrackerApplication in X.XXX seconds`

## Step 4: Install Frontend Dependencies

Open a NEW terminal in the `frontend` folder and run:

```bash
npm install
```

This will install all required packages (React, TypeScript, Tailwind CSS, etc.)

## Step 5: Start Frontend

In the same `frontend` terminal, run:

```bash
npm start
```

✅ Frontend should start on **http://localhost:3000**

Browser will automatically open to the login page.

## Step 6: Create First User

1. Click "Sign Up" on the login page
2. Fill in:
   - Full Name: `Admin User`
   - Username: `admin@test.com`
   - Password: `admin123`
   - Confirm Password: `admin123`
3. Click "Sign Up"

You will be automatically logged in and redirected to the dashboard!

## Step 7: Update User Role to ADMIN (Optional)

By default, new users are created with MEMBER role. To test admin features:

1. In MySQL, run:
   ```sql
   USE research_tracker;
   UPDATE users SET role = 'ADMIN' WHERE username = 'admin@test.com';
   ```
2. Logout and login again to see admin features

## Testing the Application

### Test 1: Create a Project (ADMIN/PI only)
1. Go to "Projects" page
2. Click "+ New Project"
3. Fill in project details
4. Click "Create"

### Test 2: View Dashboard
1. Navigate to Dashboard
2. See welcome message and quick access cards

### Test 3: Test Different Roles
Create multiple users with different roles to test role-based access:
- ADMIN: Full access
- PI: Can create projects
- MEMBER: Can create milestones
- VIEWER: Read-only access

## Common Issues & Solutions

### ❌ Backend: Port 8080 already in use
**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```

### ❌ Frontend: Port 3000 already in use
**Solution**: When prompted, type `y` to use a different port

### ❌ Database connection failed
**Solution**: 
- Make sure MySQL is running
- Verify username/password in application.properties
- Check if database exists

### ❌ Frontend can't connect to backend
**Solution**:
- Ensure backend is running on port 8080
- Check browser console for errors
- Verify API URL in `frontend/src/services/api.ts`

## Default Test Accounts

After running the application, you can create these test accounts:

| Username | Password | Role | Purpose |
|----------|----------|------|---------|
| admin@test.com | admin123 | ADMIN (manually set) | Full system access |
| pi@test.com | pi123 | MEMBER (default) | Change to PI in database |
| member@test.com | member123 | MEMBER | Create milestones/documents |
| viewer@test.com | viewer123 | VIEWER (manually set) | Read-only access |

To change roles, use MySQL:
```sql
UPDATE users SET role = 'PI' WHERE username = 'pi@test.com';
UPDATE users SET role = 'VIEWER' WHERE username = 'viewer@test.com';
```

## Next Steps

1. ✅ Read the detailed documentation in `backend/README.md` and `frontend/README.md`
2. ✅ Test all CRUD operations
3. ✅ Explore role-based access control
4. ✅ Customize the UI colors in `frontend/tailwind.config.js`
5. ✅ Add more features as needed

## Need Help?

- Check the README files in backend and frontend folders
- Review the code comments
- Test with Postman/cURL for API debugging
- Check browser console and backend logs for errors

## 🎉 You're All Set!

Your Research Project Tracker is now running. Enjoy exploring the application!
