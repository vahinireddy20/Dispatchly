# 🚀 Dispatchly – Backend (User Management & Notification System)

Dispatchly is a focused backend system designed for streamlined task management and workforce communication. It allows admins to manage users, assign tasks, and verify identities through a specialized OTP-based login system for staff and a password-based system for admins.

## ✨ Key Features

### 🔐 Multi-Role Authentication
-   **Admins**: Secure login via Phone Number and Password. Full control over task creation and user management.
-   **Staff/Users**: Instant "Login or Register" using only their Phone Number and a 6-digit OTP (sent via Email/Nodemailer).
-   **Smart Recognition**: The system automatically detects if a number belongs to an admin or a staff member to show the correct login type.

### 📋 Task Dispatching
-   **Creation**: Admins can create tasks and assign them to specific staff members by their Name/ID.
-   **Tracking**: Users can view their assigned tasks and update statuses in real-time.
-   **Admin Overview**: Admins have a global view of all tasks across the organization.

### 📧 Notification System
-   **Nodemailer Integration**: Automated OTP delivery via SMTP.
-   **Development Mode**: Automatic fallback to Ethereal Mail with preview links in the terminal if SMTP is not configured.

## 🛠 Tech Stack
-   **Runtime**: Node.js with TypeScript
-   **Framework**: Express.js
-   **ORM**: Prisma
-   **Database**: PostgreSQL
-   **Auth**: JSON Web Tokens (JWT) & Bcrypt
-   **Docs**: Swagger (OpenAPI 3.0)

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dispatchly"
JWT_SECRET="your-super-secret-key"
PORT=3000

# Email Configuration (Optional for Dev, required for Production)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 3. Database Migration
```bash
npx prisma migrate dev
```

### 4. Admin Seeding
To set up your initial admin user (`+918919524686`):
```bash
npx ts-node seed_admin.ts
```

### 5. Start Development Server
```bash
npm run dev
```

---

## 📖 API Documentation
Once the server is running, access the interactive Swagger documentation at:
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Core Endpoints:
-   `POST /api/auth/request-otp`: Start login for staff (sends OTP) or trigger admin password prompt.
-   `POST /api/auth/verify-otp`: Exchange OTP for a JWT token (includes user onboarding).
-   `POST /api/auth/login`: Direct password login for Admins.
-   `GET /api/tasks`: Retrieve tasks (scoped by role).
-   `POST /api/tasks`: Create tasks (Admin only).

## 🗄 Project Structure
-   `src/modules/auth`: Authentication logic, types, and routes.
-   `src/modules/tasks`: Task management CRUD operations.
-   `src/common/utils`: Shared utilities (JWT, Hashing, Nodemailer).
-   `prisma/schema.prisma`: Database models (User, Task).
