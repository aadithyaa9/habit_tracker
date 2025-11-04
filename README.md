# 🎯 Habit Tracker - MERN Stack Application

![MongoDB](https://img.shields.io/badge/MongoDB-v6.0+-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-v4.18+-blue.svg)
![React](https://img.shields.io/badge/React-v18.2+-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Vite](https://img.shields.io/badge/Vite-v4.4+-646CFF.svg)

A beautiful, modern habit tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). Track your daily habits, build streaks, and visualize your progress with an intuitive dashboard.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Frontend Components](#-frontend-components)
- [Authentication Flow](#-authentication-flow)
- [Running the Application](#-running-the-application)
- [Development Workflow](#-development-workflow)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Features
- 🔐 **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- 📊 **Dashboard**: Real-time statistics showing completed habits, streaks, and active habits
- ✅ **Habit Management**: Create, read, update, and delete habits
- 🔥 **Streak Tracking**: Automatic calculation of consecutive completion streaks
- 🎨 **Customization**: Choose custom icons and colors for each habit
- 📅 **Daily Checkmarks**: Mark habits as complete for each day
- 📱 **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile

### Advanced Features
- 🔄 **Real-time Updates**: Instant UI updates when toggling habits
- 💾 **Persistent Storage**: All data stored in MongoDB with proper indexing
- 🎯 **Frequency Settings**: Set which days of the week to track each habit
- 🔒 **Secure Cookies**: HTTP-only cookies for token storage
- ⚡ **Fast Development**: Hot Module Replacement (HMR) with Vite
- 🎨 **Modern UI**: Gradient backgrounds, glassmorphism effects, and smooth animations

---

## 🛠 Tech Stack

### Backend
- **Node.js** (v18+): JavaScript runtime
- **Express.js** (v4.18.2): Web application framework
- **MongoDB** (v6.0+): NoSQL database
- **Mongoose** (v8.0.3): MongoDB object modeling
- **JWT** (jsonwebtoken v9.0.2): Authentication tokens
- **bcryptjs** (v2.4.3): Password hashing
- **cookie-parser**: Cookie parsing middleware
- **cors** (v2.8.5): Cross-Origin Resource Sharing
- **dotenv** (v16.3.1): Environment variable management

### Frontend
- **React** (v18.2.0): UI library
- **Vite** (v4.4.5): Build tool and development server
- **Tailwind CSS** (v3.3.3): Utility-first CSS framework
- **Lucide React** (v0.263.1): Beautiful icon library
- **Native Fetch API**: HTTP requests (no axios dependency)

### Development Tools
- **Nodemon** (v3.0.2): Auto-restart server on file changes
- **PostCSS** (v8.4.27): CSS processing
- **Autoprefixer** (v10.4.14): CSS vendor prefixing

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │◄───────►│  Express API    │◄───────►│    MongoDB      │
│   (Port 3000)   │   HTTP  │  (Port 5000)    │  CRUD   │                 │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                           │
        │                           │
        ▼                           ▼
   ┌─────────┐              ┌──────────────┐
   │ Tailwind│              │ JWT + Cookies│
   │   CSS   │              │ Auth System  │
   └─────────┘              └──────────────┘
```

### Application Flow

```
User Login
    │
    ├─► Enter Credentials
    │
    ├─► Backend validates (bcrypt)
    │
    ├─► Generate JWT Token
    │
    ├─► Store in HTTP-only Cookie
    │
    └─► Redirect to Dashboard

Dashboard Access
    │
    ├─► Cookie automatically sent with request
    │
    ├─► Backend validates JWT
    │
    ├─► Fetch user's habits from MongoDB
    │
    ├─► Calculate streaks
    │
    └─► Render Dashboard with data

Habit Operations
    │
    ├─► Create: POST /api/habits
    ├─► Read: GET /api/habits
    ├─► Delete: DELETE /api/habits/:id
    └─► Toggle: POST /api/checkmarks/toggle
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18.0.0 or higher)
   ```bash
   node --version
   ```

2. **MongoDB** (v6.0 or higher)
   - Local installation OR
   - MongoDB Atlas account (cloud database)
   ```bash
   mongod --version
   ```

3. **npm** (comes with Node.js) or **yarn**
   ```bash
   npm --version
   ```

4. **Git** (for cloning the repository)
   ```bash
   git --version
   ```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/habit-tracker.git

# Navigate to project directory
cd habit-tracker
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Backend `.env` Configuration:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/habit-tracker
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/habit-tracker?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Frontend `.env` Configuration:**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
# On macOS:
brew services start mongodb-community

# On Ubuntu/Linux:
sudo systemctl start mongod

# On Windows:
# MongoDB starts automatically as a service
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env`

---

## 📁 Project Structure

```
habit-tracker/
│
├── backend/                          # Backend (Express + MongoDB)
│   ├── models/                       # Mongoose models
│   │   ├── User.js                   # User schema
│   │   ├── Habit.js                  # Habit schema
│   │   └── Checkmark.js              # Checkmark schema
│   │
│   ├── routes/                       # API routes
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── habitRoutes.js            # Habit CRUD endpoints
│   │   └── checkmarkRoutes.js        # Checkmark endpoints
│   │
│   ├── middleware/                   # Custom middleware
│   │   └── auth.js                   # JWT authentication
│   │
│   ├── .env                          # Environment variables
│   ├── server.js                     # Express app entry point
│   └── package.json                  # Backend dependencies
│
├── frontend/                         # Frontend (React + Vite)
│   ├── public/                       # Static assets
│   │
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── AuthModal.jsx         # Login/Register modal
│   │   │   ├── HabitCard.jsx         # Individual habit card
│   │   │   ├── HabitModal.jsx        # Create habit modal
│   │   │   └── StatsGrid.jsx         # Dashboard statistics
│   │   │
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Tailwind CSS imports
│   │
│   ├── .env                          # Frontend env variables
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── postcss.config.js             # PostCSS configuration
│   └── package.json                  # Frontend dependencies
│
└── README.md                         # Project documentation
```

---

## 🔧 Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | 5000 | No |
| `NODE_ENV` | Environment (development/production) | development | No |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/habit-tracker | Yes |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api | Yes |

**Important Security Notes:**
- Never commit `.env` files to version control
- Use different `JWT_SECRET` for production
- Use environment-specific MongoDB URIs
- Keep `JWT_SECRET` at least 32 characters long

---

## 💾 Database Schema

### User Model (`User.js`)

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  username: String,                 // Unique username
  password: String,                 // Bcrypt hashed password
  createdAt: Date,                  // Account creation timestamp
  updatedAt: Date                   // Last update timestamp
}
```

**Indexes:**
- `username`: Unique index for fast lookups

**Methods:**
- `comparePassword(candidatePassword)`: Compares plain text password with hashed password

**Hooks:**
- Pre-save: Automatically hashes password before saving

### Habit Model (`Habit.js`)

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  userId: ObjectId,                 // Reference to User
  name: String,                     // Habit name (max 100 chars)
  description: String,              // Optional description (max 500 chars)
  color: String,                    // Hex color code (e.g., "#3b82f6")
  icon: String,                     // Emoji icon (default: "⭐")
  frequency: [Number],              // Days of week [0-6] (0=Sunday)
  streak: Number,                   // Current consecutive days streak
  archived: Boolean,                // Soft delete flag
  createdAt: Date,                  // Creation timestamp
  updatedAt: Date                   // Last update timestamp
}
```

**Indexes:**
- `userId`: Index for querying user's habits

**Methods:**
- `calculateStreak()`: Calculates current streak based on checkmarks

**Default Values:**
- `color`: "#3b82f6"
- `icon`: "⭐"
- `frequency`: [0, 1, 2, 3, 4, 5, 6] (all days)
- `streak`: 0
- `archived`: false

### Checkmark Model (`Checkmark.js`)

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  habitId: ObjectId,                // Reference to Habit
  date: Date,                       // Date of checkmark (normalized to midnight)
  completed: Boolean,               // Completion status
  note: String,                     // Optional note (max 200 chars)
  createdAt: Date,                  // Creation timestamp
  updatedAt: Date                   // Last update timestamp
}
```

**Indexes:**
- `habitId`: Index for querying habit's checkmarks
- Compound unique index: `(habitId, date)` - ensures one checkmark per habit per day

**Static Methods:**
- `getByDateRange(habitId, startDate, endDate)`: Get checkmarks in date range
- `toggle(habitId, date)`: Toggle checkmark for specific date

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully"
}
```

**Errors:**
- `400`: User already exists
- `500`: Server error

---

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Sets Cookie:**
- Name: `token`
- HttpOnly: true
- Secure: true (in production)
- Max-Age: 1 hour

**Errors:**
- `401`: Invalid credentials
- `500`: Server error

---

### Habit Endpoints

**All habit endpoints require authentication via JWT token in cookie.**

#### 3. Get All Habits
```http
GET /habits
Authorization: Bearer <token> (sent automatically via cookie)
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Morning Exercise",
    "description": "30 minutes workout",
    "color": "#3b82f6",
    "icon": "💪",
    "frequency": [1, 2, 3, 4, 5],
    "streak": 5,
    "archived": false,
    "userId": "507f191e810c19729de860ea",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-06T00:00:00.000Z"
  }
]
```

---

#### 4. Get Single Habit
```http
GET /habits/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Morning Exercise",
  "description": "30 minutes workout",
  "color": "#3b82f6",
  "icon": "💪",
  "frequency": [1, 2, 3, 4, 5],
  "streak": 5,
  "archived": false,
  "userId": "507f191e810c19729de860ea",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-06T00:00:00.000Z"
}
```

**Errors:**
- `404`: Habit not found or not authorized

---

#### 5. Create New Habit
```http
POST /habits
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Read Books",
  "description": "Read for 30 minutes daily",
  "color": "#f59e0b",
  "icon": "📚",
  "frequency": [0, 1, 2, 3, 4, 5, 6]
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Read Books",
  "description": "Read for 30 minutes daily",
  "color": "#f59e0b",
  "icon": "📚",
  "frequency": [0, 1, 2, 3, 4, 5, 6],
  "streak": 0,
  "archived": false,
  "userId": "507f191e810c19729de860ea",
  "createdAt": "2024-01-06T10:30:00.000Z",
  "updatedAt": "2024-01-06T10:30:00.000Z"
}
```

**Validation:**
- `name`: Required, max 100 characters
- `description`: Optional, max 500 characters
- `color`: Valid hex color
- `frequency`: Array of numbers 0-6

---

#### 6. Update Habit
```http
PUT /habits/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Read Books Daily",
  "description": "Read for 45 minutes daily",
  "color": "#ef4444"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Read Books Daily",
  "description": "Read for 45 minutes daily",
  "color": "#ef4444",
  "icon": "📚",
  "frequency": [0, 1, 2, 3, 4, 5, 6],
  "streak": 0,
  "archived": false,
  "userId": "507f191e810c19729de860ea",
  "createdAt": "2024-01-06T10:30:00.000Z",
  "updatedAt": "2024-01-06T11:45:00.000Z"
}
```

**Errors:**
- `404`: Habit not found or not authorized

---

#### 7. Delete Habit
```http
DELETE /habits/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Habit and associated checkmarks deleted"
}
```

**Note:** This also deletes all associated checkmarks (cascade delete).

**Errors:**
- `404`: Habit not found or not authorized

---

### Checkmark Endpoints

#### 8. Get Checkmarks for Habit
```http
GET /checkmarks/habit/:habitId?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "habitId": "507f1f77bcf86cd799439011",
    "date": "2024-01-05T00:00:00.000Z",
    "completed": true,
    "note": "Great workout today!",
    "createdAt": "2024-01-05T08:30:00.000Z",
    "updatedAt": "2024-01-05T08:30:00.000Z"
  }
]
```

---

#### 9. Toggle Checkmark
```http
POST /checkmarks/toggle
Content-Type: application/json
Authorization: Bearer <token>

{
  "habitId": "507f1f77bcf86cd799439011",
  "date": "2024-01-06"
}
```

**Response (200 OK):**
```json
{
  "streak": 6,
  "checkmark": {
    "_id": "507f1f77bcf86cd799439014",
    "habitId": "507f1f77bcf86cd799439011",
    "date": "2024-01-06T00:00:00.000Z",
    "completed": true,
    "createdAt": "2024-01-06T10:00:00.000Z",
    "updatedAt": "2024-01-06T10:00:00.000Z"
  }
}
```

**Behavior:**
- If checkmark doesn't exist: Creates new checkmark (completed: true)
- If checkmark exists: Toggles `completed` status
- Automatically recalculates streak

**Errors:**
- `400`: Missing habitId or date
- `404`: Habit not found or not authorized

---

## 🎨 Frontend Components

### Component Hierarchy

```
App.jsx
  ├── AuthModal.jsx (if not authenticated)
  │
  └── Dashboard (if authenticated)
      ├── Header
      │   ├── Title & Subtitle
      │   ├── Add Habit Button
      │   └── Logout Button
      │
      ├── StatsGrid.jsx
      │   ├── Completed Today Stat
      │   ├── Longest Streak Stat
      │   ├── Active Habits Stat
      │   └── Days in Month Stat
      │
      ├── Habits Grid
      │   └── HabitCard.jsx (for each habit)
      │       ├── Icon & Info
      │       ├── Delete Button
      │       ├── Streak Display
      │       └── Check Button
      │
      └── HabitModal.jsx (when creating)
          ├── Name Input
          ├── Description Textarea
          ├── Icon Input
          ├── Color Picker
          └── Create Button
```

### Component Details

#### 1. **App.jsx**
- **Purpose**: Main application container and state management
- **State Management**:
  - `isAuthenticated`: Boolean for authentication status
  - `habits`: Array of user's habits
  - `showHabitModal`: Boolean for modal visibility
  - `loading`: Boolean for loading state
- **API Functions**:
  - `apiCall()`: Unified API request function with auth
  - `fetchHabits()`: Fetches all user habits
  - `handleCreateHabit()`: Creates new habit
  - `handleToggleCheckmark()`: Toggles habit completion
  - `handleDeleteHabit()`: Deletes habit
  - `handleLogout()`: Logs out user
- **Computed Data**:
  - `getStats()`: Calculates dashboard statistics

#### 2. **AuthModal.jsx**
- **Purpose**: User authentication (login/register)
- **Props**:
  - `onSuccess`: Callback function after successful auth
- **State**:
  - `isLogin`: Toggle between login and register
  - `formData`: Username and password
  - `error`: Error message display
  - `loading`: Submit button state
- **Features**:
  - Form validation
  - Error handling and display
  - Automatic redirect after registration
  - JWT token storage

#### 3. **HabitCard.jsx**
- **Purpose**: Display individual habit with actions
- **Props**:
  - `habit`: Habit object with all properties
  - `onToggle`: Function to toggle completion
  - `onDelete`: Function to delete habit
- **Features**:
  - Custom icon and color display
  - Streak visualization with fire emoji
  - Delete confirmation
  - Hover effects

#### 4. **HabitModal.jsx**
- **Purpose**: Form for creating new habits
- **Props**:
  - `onClose`: Function to close modal
  - `onSubmit`: Function to handle form submission
- **State**:
  - `formData`: All habit properties
  - `loading`: Submit button state
- **Features**:
  - Color picker for habit color
  - Emoji input for icon
  - Textarea for description
  - Form validation

#### 5. **StatsGrid.jsx**
- **Purpose**: Display dashboard statistics
- **Props**:
  - `stats`: Object with statistics data
- **Features**:
  - Responsive grid layout
  - Icon-based visual indicators
  - Color-coded stat cards
  - Real-time updates

---

## 🔐 Authentication Flow

### Registration Flow

```
User Registration
    │
    ▼
1. User fills registration form
    │
    ▼
2. Frontend validates input
    │
    ▼
3. POST /api/auth/register
    │
    ▼
4. Backend checks if user exists
    │
    ├─► Exists: Return 400 error
    │
    └─► Not exists:
        │
        ▼
5. Hash password with bcrypt (10 rounds)
        │
        ▼
6. Create user in MongoDB
        │
        ▼
7. Return success message
        │
        ▼
8. Frontend redirects to login
```

### Login Flow

```
User Login
    │
    ▼
1. User fills login form
    │
    ▼
2. Frontend validates input
    │
    ▼
3. POST /api/auth/login
    │
    ▼
4. Backend finds user by username
    │
    ├─► Not found: Return 401 error
    │
    └─► Found:
        │
        ▼
5. Compare password with bcrypt
        │
        ├─► Invalid: Return 401 error
        │
        └─► Valid:
            │
            ▼
6. Generate JWT token
   Payload: { userId: user._id }
   Secret: JWT_SECRET
   Expires: 1 hour
            │
            ▼
7. Set HTTP-only cookie
   Name: "token"
   HttpOnly: true
   Secure: true (production)
   SameSite: "strict"
            │
            ▼
8. Return token in response
            │
            ▼
9. Frontend stores auth state
            │
            ▼
10. Redirect to dashboard
```

### Protected Route Access

```
Access Protected Route
    │
    ▼
1. Frontend makes API request
   Cookie sent automatically
    │
    ▼
2. Backend middleware extracts token
    │
    ├─► No token: Return 401
    │
    └─► Token present:
        │
        ▼
3. Verify JWT with JWT_SECRET
        │
        ├─► Invalid/Expired: Return 401
        │
        └─► Valid:
            │
            ▼
4. Extract userId from token
            │
            ▼
5. Attach userId to request
   req.user.id = userId
            │
            ▼
6. Continue to route handler
```

### Logout Flow

```
User Logout
    │
    ▼
1. User clicks logout button
    │
    ▼
2. Frontend clears token from localStorage
    │
    ▼
3. Frontend sets isAuthenticated = false
    │
    ▼
4. Frontend redirects to login
    │
    ▼
5. Future requests have no token
```

---

## 🏃 Running the Application

### Development Mode

#### Start Backend Server
```bash
# Terminal 1: Navigate to backend
cd backend

# Start server with nodemon (auto-restart)
npm run dev

# Expected output:
# 🚀 Server running on port 5000
# ✅ Connected to MongoDB
```

#### Start Frontend Development Server
```bash
# Terminal 2: Navigate to frontend
cd frontend

# Start Vite dev server
npm run dev

# Expected output:
#   VITE v4.4.5  ready in 500 ms
#   ➜  Local:   http://localhost:3000/
#   ➜  Network: use --host to expose
```

### Access the Application
```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
API Health Check: http://localhost:5000/api/health
```

### Production Mode

#### Build Frontend
```bash
cd frontend
npm run build

# Output: frontend/dist/
```

#### Start Backend in Production
```bash
cd backend

# Set environment
export NODE_ENV=production

# Start server
npm start
```

#### Serve Frontend (Static)
```bash
# Option 1: Use a static server
npx serve -s frontend/dist -p 3000

# Option 2: Serve from Express
# (Uncomment production code in server.js)
```

---

## 🔄 Development Workflow

### 1. Creating a New Feature

```bash
# Create a new branch
git checkout -b feature/habit-reminders

# Make changes
# ... edit files ...

# Test locally
npm run dev

# Commit changes
git add .
git commit -m "Add habit reminder feature"

# Push to remote
git push origin feature/habit-reminders

# Create pull request
```

### 2. Database Migrations

```bash
# After changing Mongoose models

# 1. Drop existing collections (if needed)
mongo habit-tracker
db.habits.drop()
db.checkmarks.drop()

# 2. Restart server (will recreate collections)
npm run dev

# 3. Seed initial data (optional)
node seed.js
```

### 3. Testing API Endpoints

**Using cURL:**
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' \
  -c cookies.txt

# Get habits (with authentication)
curl -X GET http://localhost:5000/api/habits \
  -b cookies.txt
```

**Using Postman:**
1. Create a collection "Habit Tracker API"
2. Set base URL: `http://localhost:5000/api`
3. For protected routes: Add cookie from login response
4. Test all endpoints

### 4. Debugging

**Backend Debugging:**
```javascript
// Add debug logging
console.log('User ID:', req.user.id);
console.log('Habit data:', habit);

// Use debugger
debugger;

// Check MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
```

**Frontend Debugging:**
```javascript
// React DevTools (install browser extension)
// Check component state and props

// Console logging
console.log('Habits:', habits);
console.log('API Response:', response);

// Network tab in browser DevTools
// Check API requests and responses
```

---
