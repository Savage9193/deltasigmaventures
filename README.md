# User Management System

A modern, responsive React + TypeScript application with professional UI, authentication, and comprehensive user management features.

## 🚀 Project Overview

This application demonstrates a full-featured user management system with:

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

- **React 18** with Vite for fast development
- **TypeScript** for type safety
- **Material UI (MUI)** for UI components and responsive design
- **React Hook Form + Yup** for form validation
- **Axios** for API communication
- **JSON-server** for mock API backend
- **React Context** for state management and authentication

## 📁 Project Structure

```
src/
 ├─ api/
 │   ├─ authService.ts          # Authentication API service
 │   └─ userService.ts          # Centralized API layer
 ├─ components/
 │   ├─ UserForm.tsx           # Schema-driven form component
 │   ├─ UserTable.tsx          # User table with actions
 │   ├─ ConfirmDialog.tsx      # Reusable confirmation dialog
 │   ├─ Login.tsx              # Login component
 │   └─ Signup.tsx             # Signup component
 ├─ config/
 │   └─ userFormSchema.ts      # Form field configuration & validation
 ├─ contexts/
 │   └─ AuthContext.tsx        # Authentication context and state
 ├─ hooks/
 │   └─ useUsers.ts            # Custom hook for user operations
 ├─ pages/
 │   ├─ UsersPage.tsx          # Main users management page
 │   ├─ DashboardPage.tsx       # Dashboard with stats and overview
 │   └─ SettingsPage.tsx       # Application settings page
 ├─ types/
 │   ├─ user.ts                # User TypeScript interfaces
 │   └─ auth.ts                # Authentication TypeScript interfaces
 ├─ App.tsx                    # Root component with theme and navigation
 └─ main.tsx                   # Application entry point
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-user-crud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the mock API server**
   ```bash
   npm run server
   ```
   This will start JSON-server on port 3001 with sample user data.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## 🌐 Mock API Setup

The application uses **JSON-server** to provide a RESTful API with a simple JSON file as the database.

### API Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/profile` - Get user profile

#### Users
- `GET /users` - Fetch all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Database Structure

The `db.json` file contains the initial data:

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

## 📝 How to Add New Fields

One of the key features of this application is the **schema-driven form**. Adding a new field requires only editing the schema file:

### Step-by-Step Example

Let's add a "Date of Birth" field:

1. **Open** `src/config/userFormSchema.ts`

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

3. **Update TypeScript interfaces** in `src/types/user.ts`:

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

4. **Update the mock data** in `db.json` (optional):

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

### Separation of Concerns

**Why:** Each layer has a clear responsibility:
- **API Layer:** Handles all HTTP communications
- **Hooks Layer:** Manages state and business logic
- **Components Layer:** Focuses on UI rendering
- **Config Layer:** Centralizes configuration and validation rules

## 🚀 Deployment

### Vercel Deployment

The application is ready for Vercel deployment:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set Environment Variables:**
   - `VITE_API_URL`: Your production API endpoint

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3001
```

For production, update this to your deployed API endpoint.

## 🧪 Features

### Core Functionality
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

### Navigation & UI
- ✅ **Responsive Navbar** with desktop and mobile layouts
- ✅ **Mobile Drawer Navigation** with slide-in menu
- ✅ **Active State Indicators** for current page
- ✅ **Professional Styling** with gradients and shadows
- ✅ **Interactive Elements** with hover states and transitions
- ✅ **Glass-morphism Effects** for modern appearance
- ✅ **Loading States** with branded loading screen

## 📝 Development Notes

- The application uses **React Hook Form** for efficient form handling
- **Yup** provides schema validation with clear error messages
- **Material UI** ensures a consistent, professional look
- **Axios** handles all API communications with proper error handling
- **TypeScript** provides compile-time type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
