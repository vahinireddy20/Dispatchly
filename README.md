# 🚀 Dispatchly
**A Microservices-Based Smart Notification Platform**  
_Node.js • Express • PostgreSQL • React • Worker/Dispatcher_

<p align="center">
  <img alt="Dispatchly" src="https://img.shields.io/badge/Dispatchly-Notify%20Smartly-blue?logo=github" />
  <img alt="Architecture" src="https://img.shields.io/badge/architecture-microservices-lightgrey" />
  <img alt="Stack" src="https://img.shields.io/badge/stack-nodejs%20%7C%20react%20%7C%20postgres-blue" />
</p>

## 📌 Overview

**Dispatchly** is a microservices-based **notification engine** that allows an admin to send notifications (email / SMS / push mock) to users.  
Notifications are **queued**, and a background **dispatcher worker** processes and “sends” them with retry logic.

This project mimics real-world notification systems used by companies like **Swiggy, Amazon, Ola, and banking apps** — perfect for learning microservices and showcasing backend skills on a resume.


## ✨ Features

### 🟦 Backend
- Microservices architecture  
- User registration, login (JWT), and list users  
- Notification queueing system  
- Dispatcher worker (polling) with retry logic  
- Mock email/SMS/push delivery (no cost)  
- PostgreSQL database  
- Clean REST APIs  

### 🟩 Frontend
- React Admin Dashboard  
- Login page  
- Send Notification page  
- Notification Logs page  

### 🟧 Architecture
- 3 services:
  - **User Service**
  - **Notification Service**
  - **Dispatcher Worker**
- React client  
- Shared Postgres DB (for simplicity)

---

## 🏗 Architecture Diagram

```

┌──────────────────┐        ┌────────────────────┐
│  React Admin UI  │──────► │ Notification API    │───► stores notification (queued)
└──────────────────┘        └────────────────────┘
│                           │
│ GET users                 │ reads users
▼                           ▼
┌──────────────┐            ┌───────────────┐
│ User Service │            │ PostgreSQL DB │
└──────────────┘            └───────────────┘
▲
│ poll queued notifications
┌────────────────────┐
│ Dispatcher Worker  │───► mock email/SMS/push
└────────────────────┘

```

## 📁 Project Structure

dispatchly/
user-service/
notification-service/
dispatcher-service/
client/
README.md

````

## 🗄 Database Schema (PostgreSQL)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20),
  password TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE preferences (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  email_enabled BOOLEAN DEFAULT TRUE,
  sms_enabled BOOLEAN DEFAULT FALSE,
  push_enabled BOOLEAN DEFAULT FALSE
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT,
  message TEXT,
  channel VARCHAR(20),
  status VARCHAR(20) DEFAULT 'queued',
  attempts INT DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMP DEFAULT now(),
  sent_at TIMESTAMP
);
````

## 🔌 API Endpoints

### **User Service** 

| Method | Endpoint          | Description |
| ------ | ----------------- | ----------- |
| POST   | `/users/register` | Create user |
| POST   | `/users/login`    | Login & JWT |
| GET    | `/users`          | List users  |

---

### **Notification Service** 

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/notify`        | Queue notification |
| GET    | `/notifications` | List notifications |

---

## 🧠 Concepts Demonstrated

* Microservices architecture
* JWT authentication
* Queueing + background workers
* Retry mechanism
* PostgreSQL relational modelling
* RESTful API design
* React frontend integration
