# Task Tracker Mobile App

A full-stack Task Tracker Mobile Application built using React Native, Expo, Node.js, Express.js, MongoDB, and TanStack Query.

This project was developed as part of the Full Stack Developer Internship Assignment for RoundTechSquare.

---

#  Tech Stack

## Frontend
- React Native (Expo)
- TypeScript
- TanStack Query
- React Navigation
- Axios
- AsyncStorage

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# Features

## Authentication
- User Signup 
- User Login
- JWT Token Authentication
- Persistent Login using AsyncStorage

---

## Task Management
Users can:

- Create Tasks
- Add Task Description
- View All Tasks
- Edit Tasks
- Mark Tasks as Completed
- Delete Tasks
- Filter Tasks:
  - All
  - Completed
  - Pending

---

## UI Features
- Modern Mobile UI
- Responsive Design
- Pull to Refresh
- Loading States
- Empty State Handling
- Different Card Colors for Completed and Pending Tasks

---

# Folder Structure

```bash
tracker_app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── mobile/
│   ├── assets/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   │
│   │   ├── navigation/
│   │   │   └── AppNavigator.tsx
│   │   │
│   │   └── screens/
│   │       ├── LoginScreen.tsx
│   │       ├── SignupScreen.tsx
│   │       └── TaskScreen.tsx
│   │
│   ├── App.tsx
│   ├── app.json
│   ├── index.tsx
│   ├── tsconfig.json
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore
```

---

# Backend Setup

## 1. Navigate to backend folder

```bash
cd backend
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create `.env` file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 4. Start backend server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

---

# 📱 Frontend Setup

## 1. Navigate to mobile folder

```bash
cd mobile
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Update API Base URL

Open file:

```bash
src/api/api.ts
```

Replace localhost with your local IP address.

Example:

```ts
baseURL: "http://192.168.1.5:5000"
```

Find your IP using:

```bash
ip a
```

---

## 4. Start Expo App

```bash
npm start
```

or

```bash
npx expo start
```

---

# Running the App

- Install Expo Go on your mobile device
- Scan the QR code shown in terminal
- Ensure both laptop and mobile are connected to the same WiFi

---

# API Endpoints

# Authentication Routes

## Signup

```http
POST /auth/signup
```

### Request Body

```json
{
  "name": "Sakshi",
  "email": "sakshi@gmail.com",
  "password": "123456"
}
```

---

## Login

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "sakshi@gmail.com",
  "password": "123456"
}
```

---

# Task Routes

## Get All Tasks

```http
GET /tasks
```

---

## Create Task

```http
POST /tasks
```

### Request Body

```json
{
  "title": "Complete assignment",
  "description": "Finish internship task tracker app"
}
```

---

## Update Task

```http
PATCH /tasks/:id
```

---

## Delete Task

```http
DELETE /tasks/:id
```

---

# Authentication Flow

1. User signs up or logs in
2. Backend generates JWT token
3. Token stored using AsyncStorage
4. Token attached in every API request
5. Protected routes validate JWT token

---

# State Management

TanStack Query is used for:

- Fetching tasks
- Creating tasks
- Updating tasks
- Deleting tasks
- Cache invalidation
- Loading states
- Error handling

---

# Assignment Requirements Completed

## Backend
- Express.js backend created
- MongoDB integration
- JWT authentication
- Password hashing using bcryptjs
- CRUD APIs implemented
- Validation added

---

## Frontend
- React Native + TypeScript setup
- Login & Signup screens
- Task Management UI
- API integration using Axios
- TanStack Query integration
- Loading & Empty states
- Pull-to-refresh functionality

---

# Bonus Features Implemented

- Edit Task
- Filter Tasks
- Persistent Login Session
- Improved UI Design
- Better Folder Structure

---

#Demo Video

Demo Video Link:

```txt
https://drive.google.com/file/d/1l8r7y5-cQH0tHifj94FtFkGgfRmHTSfW/view?usp=sharing
```

---

#Author

## Sakshi Kumari

---

