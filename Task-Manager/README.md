# Task Manager Application

A full-stack task management application with user authentication, role-based access control, and CRUD operations for tasks.

## Features

- **User Authentication**: JWT-based authentication system
- **Role-Based Access**: Two user roles - User and Admin
- **Task Management**: Create, read, update, and delete tasks
- **Admin Dashboard**: Manage all users and tasks (admin only)
- **Responsive Design**: Modern UI with gradient design
- **Real-time Updates**: Automatic page updates after operations

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React.js with React Router
- Context API for state management
- Axios for API calls
- Modern CSS with gradient design
- Responsive layout

## Project Structure

```
Task-Manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── Auth.css
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.js
│   │   │   │   └── Dashboard.css
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.js
│   │   │       └── AdminDashboard.css
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.js
│   └── public/
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get user's tasks
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Admin Endpoints
- `GET /api/tasks/admin/users` - Get all users with task counts
- `DELETE /api/tasks/admin/users/:id` - Delete user

## User Roles

### Regular User
- Can create, view, update, and delete their own tasks
- Can view their personal dashboard
- Cannot access admin features

### Admin User
- All user capabilities plus:
- Access to admin dashboard
- View all users and their task statistics
- Delete any user or task
- View all tasks across the system

## Default Admin Account

You can create an admin user by registering with any email and then manually updating the role in the database, or create a specific admin account during development.

## Features in Detail

### Authentication System
- Secure JWT token-based authentication
- Password hashing with bcryptjs
- Token expiration handling
- Protected routes based on authentication status

### Task Management
- Create tasks with title, description, and status
- Status options: pending, in-progress, completed
- Edit existing tasks
- Delete tasks with confirmation
- Responsive task cards with status indicators

### Admin Dashboard
- User management with task count statistics
- Task management across all users
- System statistics and analytics
- Role-based badge indicators

### UI/UX Features
- Modern gradient design
- Responsive layout for all screen sizes
- Loading states and error handling
- Form validation and user feedback
- Smooth animations and transitions

## Security Features

- JWT tokens for secure authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected API endpoints
- Input validation on both frontend and backend
- CORS configuration for cross-origin requests

## Development

The application uses:
- `nodemon` for backend auto-restart during development
- React development server with hot reloading
- ESLint for code quality
- Modern ES6+ JavaScript features

## Production Deployment

For production deployment:
1. Set up environment variables on your hosting platform
2. Build the React frontend: `npm run build`
3. Configure your web server to serve the built frontend
4. Ensure MongoDB is accessible
5. Set secure JWT secrets and other environment variables

## Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running and the URI is correct
2. **Port Conflicts**: Make sure ports 3000 (frontend) and 5000 (backend) are available
3. **CORS Issues**: The backend is configured to allow requests from localhost:3000
4. **JWT Issues**: Check that JWT_SECRET is set in the .env file

### Development Tips
- Check browser console for frontend errors
- Check backend terminal for server logs
- Use browser developer tools to inspect network requests
- Verify MongoDB connection in the backend logs

## Contributing

This is a demonstration application showcasing full-stack development with MERN technologies. Feel free to extend it with additional features like:
- Task categories or tags
- Due dates and reminders
- Task sharing between users
- File attachments
- Email notifications
- Advanced search and filtering