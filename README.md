🚀 **Backend – User Management & Notification System**

📌 Overview
This project is a Node.js backend built with Express, PostgreSQL, Prisma, and Firebase Authentication.
It provides user management and notification APIs using a clean, modular monolith architecture, keeping everything in a single repository and deployment while maintaining clear separation of concerns.

🛠 Tech Stack
Node.js + Express
PostgreSQL
Prisma ORM
Firebase Authentication
Swagger (OpenAPI)
Vercel (Deployment)

🧱 Architecture
Modular Monolith
Single codebase
Single database
Domain-based modules (auth, user, notification)
Easy to maintain and scale

High-level Flow
Client → Express API → Firebase Auth → Controllers → Services → Prisma → PostgreSQL

✨ Features
🔐 Authentication (Firebase)
Firebase email/password authentication
Firebase ID token verification on backend
Secure protected routes
No password handling in backend

👤 User Management
Store user profile data in PostgreSQL
Get current user profile
Update user profile
Role support (USER, ADMIN)

🔔 Notification System
Create notifications for users
Fetch user notifications
Mark notifications as read
Notification types:
SYSTEM
USER
SECURITY

📘 API Documentation
Swagger UI for API testing
Auth-enabled endpoints
Clear request and response schemas

📁 Project Structure
src/
 ├─ config/
 │   ├─ prisma.js
 │   ├─ firebase.js
 │
 ├─ modules/
 │   ├─ auth/
 │   ├─ user/
 │   └─ notification/
 │
 ├─ middlewares/
 │   └─ auth.middleware.js
 │
 ├─ docs/
 │   └─ swagger.js
 │
 ├─ app.js
 └─ server.js

🔑 Authentication Flow (Firebase)
User authenticates using Firebase (frontend)
Frontend sends Firebase ID token to backend
Backend verifies token using Firebase Admin SDK
User information is attached to the request
Protected route logic executes

✅ The backend does not handle passwords directly

🌐 API Design
RESTful endpoints
JSON request/response format
Consistent response structure
Proper HTTP status codes

🗄 Database
PostgreSQL with Prisma ORM
Users stored using Firebase UID as reference
One-to-many relationship between users and notifications

⚠️ Error Handling
Centralized error middleware
Consistent error responses
No business logic in routes

🔐 Environment Variables
DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

🚀 Deployment
Deployed on Vercel
Uses managed PostgreSQL

🎯 Design Principles
Separation of concerns
Thin routes, fat services
No business logic in routes
Modular and readable code
Production-focused, not over-engineered

✅ Summary
This backend is designed to be:
Simple
Secure
Maintainable
Real-world ready
It focuses on clarity and correctness, avoiding unnecessary complexity while following industry best practices.
