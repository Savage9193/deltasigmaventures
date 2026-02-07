# User Management System - Monorepo

A modern, responsive React + TypeScript application with professional UI, authentication, and comprehensive user management features, structured as a monorepo with separate frontend and backend.

## 🚀 Project Overview

This application demonstrates a full-featured user management system with:

- **Monorepo Architecture** with separate frontend and backend
- **Professional Responsive Navigation** with mobile-friendly design
- **Authentication System** with login and signup functionality
- **Default Navigation** to Users page after login
- **Active Page Highlighting** in navigation for better UX
- **Loading States** during authentication checks
- **Multi-page Navigation** with Dashboard, Users, and Settings pages
- **Schema-driven forms** for easy field addition and validation
- **Custom hooks** for clean separation of concerns
- **Material UI** for a professional, responsive interface
- **TypeScript** for type safety and better developer experience
- **Modular architecture** for maintainability and extensibility

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **TypeScript** for type safety
- **Material UI (MUI)** for UI components and responsive design
- **React Hook Form + Yup** for form validation
- **Axios** for API communication
- **React Context** for state management and authentication

### Backend
- **Node.js** with JSON-server for RESTful API
- **CORS** enabled for cross-origin requests
- **Environment-based configuration** for deployment flexibility

## 📁 Project Structure

```
project-root/
 ├─ frontend/        ← React + TypeScript + Vite + MUI
 │   ├─ src/
 │   │   ├─ api/
 │   │   │   ├─ authService.ts          # Authentication API service
 │   │   │   └─ userService.ts          # Centralized API layer
 │   │   ├─ components/
 │   │   │   ├─ UserForm.tsx           # Schema-driven form component
 │   │   │   ├─ UserTable.tsx          # User table with actions
 │   │   │   ├─ ConfirmDialog.tsx      # Reusable confirmation dialog
 │   │   │   ├─ Login.tsx              # Login component
 │   │   │   └─ Signup.tsx             # Signup component
 │   │   ├─ config/
 │   │   │   └─ userFormSchema.ts      # Form field configuration & validation
 │   │   ├─ contexts/
 │   │   │   └─ AuthContext.tsx        # Authentication context and state
 │   │   ├─ hooks/
 │   │   │   └─ useUsers.ts            # Custom hook for user operations
 │   │   ├─ pages/
 │   │   │   ├─ UsersPage.tsx          # Main users management page
 │   │   │   ├─ DashboardPage.tsx       # Dashboard with stats and overview
 │   │   │   └─ SettingsPage.tsx       # Application settings page
 │   │   ├─ types/
 │   │   │   ├─ user.ts                # User TypeScript interfaces
 │   │   │   └─ auth.ts                # Authentication TypeScript interfaces
 │   │   ├─ App.tsx                    # Root component with theme and navigation
 │   │   └─ main.tsx                   # Application entry point
 │   ├─ package.json
 │   ├─ vite.config.ts
 │   └─ .env.example
 │
 ├─ backend/         ← JSON-server backend
 │   ├─ server.js                 # Programmatic JSON-server setup
 │   ├─ package.json
 │   └─ db.json                   # Database file with users and customers
 │
 └─ package.json     # Root workspace configuration
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-user-crud-monorepo
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Create frontend environment file**
   ```bash
   # Copy the example file and create .env in frontend/
   cp frontend/.env.example frontend/.env
   ```
   The `.env` file should contain:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. **Start both frontend and backend**
   ```bash
   npm run dev
   ```
   This will start:
   - Backend API server on `http://localhost:3001`
   - Frontend development server on `http://localhost:5173`

### Individual Development

To run services separately:

```bash
# Start backend only
npm start -backend

# Start frontend only (in separate terminal)
npm run dev-frontend
```

**Important:** Always keep both services running in separate terminals for full functionality.

## 🌐 Backend API

### JSON-Server Configuration

The backend uses JSON-server programmatically with:
- **CORS enabled** for frontend communication
- **Environment-based port** configuration (default: 3001)
- **Health check endpoint** at `/api/health`

### API Endpoints

#### Authentication
- `GET /customers` - Fetch all customers (used for login)
- `POST /customers` - Create new customer (signup)

#### Users
- `GET /users` - Fetch all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Database Structure

The `backend/db.json` file contains the initial data:

```json
{
  "users": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "1234567890",
      "status": "active"
    }
  ],
  "customers": [
    {
      "id": 1,
      "firstName": "Admin",
      "lastName": "User",
      "email": "admin@example.com",
      "password": "admin123"
    }
  ]
}
```

## 🔧 Frontend Configuration

### Environment Variables

Create a `.env` file in the `frontend/` directory based on `.env.example`:

```env
VITE_API_URL=http://localhost:3001
```

**Critical:** The `.env` file must be created manually as it's ignored by git. Without this file, the frontend will not connect to the backend API.

For production, update this to your deployed backend endpoint.

### API Configuration

The frontend uses environment-based API configuration:
- **Development**: Uses local backend (`http://localhost:3001`)
- **Production**: Uses deployed backend URL

### Common Issues

#### Frontend can't connect to backend
- Ensure `.env` file exists in `frontend/` directory
- Verify backend is running on port 3001
- Check that both services are running in separate terminals

#### Port conflicts
- Backend runs on port 3001
- Frontend runs on port 5173 (default Vite port)
- If ports are in use, kill conflicting processes with `taskkill /PID <PID> /F`

## 🚀 Deployment Strategy

### Frontend → Vercel

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set Environment Variables:**
   - `VITE_API_URL`: Your deployed backend URL
4. **Configure Build Settings:**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Backend → Render

1. **Push to GitHub**
2. **Connect to Render**
3. **Configure Web Service:**
   - Root Directory: `backend`
   - Start Command: `npm start`
   - Environment: Node
4. **Set Environment Variables:**
   - `PORT`: 3001 (or any available port)

### Deployment Notes

- **Same GitHub Repository**: Both frontend and backend deploy from the same repo
- **Render Free Tier**: Note that cold starts may occur (30-60 seconds)
- **CORS Configuration**: Backend is configured to accept requests from any origin
- **Environment Variables**: Ensure API URLs are correctly configured for production

## 📝 How to Add New Fields

One of the key features of this application is the **schema-driven form**. Adding a new field requires only editing the schema file:

### Step-by-Step Example

Let's add a "Date of Birth" field:

1. **Open** `frontend/src/config/userFormSchema.ts`

2. **Add the new field** to the `userFormFields` array:

```typescript
{
  name: 'dateOfBirth',
  label: 'Date of Birth',
  type: 'text',
  validation: yup.string().required('Date of birth is required'),
  required: true
}
```

3. **Update TypeScript interfaces** in `frontend/src/types/user.ts`:

```typescript
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // New field
}
```

4. **Update the mock data** in `backend/db.json` (optional):

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1990-01-01"
}
```

That's it! The form will automatically render the new field with proper validation.

## 🎨 Design Decisions

### Monorepo Architecture

**Why:** Separation of concerns and independent deployment:
- **Independent Scaling**: Frontend and backend can scale independently
- **Technology Flexibility**: Different tech stacks for frontend/backend
- **Team Collaboration**: Frontend and backend teams can work independently
- **Deployment Flexibility**: Deploy updates to frontend or backend separately

### Schema-Driven Forms

**Why:** Schema-driven forms provide several advantages:
- **Maintainability:** Adding new fields requires minimal code changes
- **Consistency:** All fields follow the same validation and rendering logic
- **Type Safety:** TypeScript ensures all required fields are handled
- **DRY Principle:** No repeated validation logic across components

### Custom Hooks

**Why:** Custom hooks promote separation of concerns:
- **Business Logic Isolation:** API calls and state management are abstracted
- **Reusability:** The same hook can be used across different components
- **Testability:** Business logic can be tested independently
- **Clean Components:** UI components focus only on presentation

## 🧪 Features

### Core Functionality
- ✅ **Monorepo Structure** with separate frontend and backend
- ✅ **Authentication System** with login and signup
- ✅ **Default Navigation** to Users page after authentication
- ✅ **Loading Screen** during authentication checks
- ✅ **Active Page Highlighting** in navigation
- ✅ **Professional Responsive Navigation** with mobile menu
- ✅ **Multi-page Application** with Dashboard, Users, and Settings
- ✅ **Create Users** with form validation
- ✅ **Read Users** in a responsive table
- ✅ **Update Users** with pre-filled forms
- ✅ **Delete Users** with confirmation dialog
- ✅ **Loading States** for better UX
- ✅ **Error Handling** with user-friendly messages
- ✅ **Success Feedback** via snack notifications

### Advanced Features
- ✅ **Schema-Driven Forms** for easy field addition
- ✅ **Custom Hooks** for clean state management
- ✅ **Responsive Design** that works on all devices
- ✅ **Type Safety** throughout the application
- ✅ **Modular Architecture** for maintainability
- ✅ **Context-based State Management** for authentication
- ✅ **Professional UI/UX** with modern design patterns
- ✅ **Mobile-First Design** with hamburger menu
- ✅ **Dashboard Statistics** and activity overview
- ✅ **Settings Page** with configurable options

### Backend Features
- ✅ **Programmatic JSON-server** with CORS support
- ✅ **Environment-based configuration** for deployment
- ✅ **Health check endpoint** for monitoring
- ✅ **RESTful API** with proper HTTP methods
- ✅ **Database persistence** with JSON file

## 📝 Development Notes

- The application uses **React Hook Form** for efficient form handling
- **Yup** provides schema validation with clear error messages
- **Material UI** ensures a consistent, professional look
- **Axios** handles all API communications with proper error handling
- **TypeScript** provides compile-time type checking
- **JSON-server** provides a production-ready mock API

## 🚀 Production Considerations

### Performance
- Frontend is optimized for Vercel deployment
- Backend uses efficient JSON-server with minimal overhead
- API calls include proper timeout and error handling

### Security
- Input validation on both frontend and backend
- CORS configuration for cross-origin requests
- Environment variables for sensitive configuration

### Scalability
- Monorepo structure allows independent scaling
- Frontend can be deployed to CDN edge networks
- Backend can be easily replaced with a real database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
