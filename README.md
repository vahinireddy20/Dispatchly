# 🚀 Dispatchly
**A Microservices-Based Smart Notification Platform**  
_Node.js • Express • PostgreSQL • React • Worker/Dispatcher_

<p align="center">
  <img alt="Dispatchly" src="https://img.shields.io/badge/Dispatchly-Notify%20Smartly-blue?logo=github" />
  <img alt="Architecture" src="https://img.shields.io/badge/architecture-microservices-lightgrey" />
  <img alt="Stack" src="https://img.shields.io/badge/stack-nodejs%20%7C%20react%20%7C%20postgres-blue" />
</p>

---

## 🔖 Overview

**Dispatchly** is a real-world style **notification engine** built using a **microservices architecture**.  
It accepts notification requests (email / SMS / push mock), stores them in a queue, and a background **dispatcher worker** processes and "delivers" them with retry logic.

It includes:
- A **User Service** (login + register + list users)
- A **Notification Service** (accepts notifications and queues them)
- A **Dispatcher Worker** (fetches queued notifications and sends mock deliveries)
- A **React Admin Dashboard** to send notifications & view logs

This project demonstrates strong backend fundamentals, real architecture patterns, and end-to-end full-stack integration.

---

## ✨ Features

### **Backend**
- Microservice-based architecture
- User registration & login (JWT + bcrypt)
- Notification queuing system
- Dispatcher Worker for message delivery
- Retry mechanism for failed notifications
- PostgreSQL as central database
- REST APIs with clean structure
- Mock delivery (no cost for SMS & email)

### **Frontend**
- React Admin Dashboard
- Login screen
- User dropdown for selecting target
- Notification sender UI
- Notifications log table

---

## 🏗 Architecture Diagram
┌──────────────────┐ ┌────────────────────┐
│ React Admin UI │──────► │ Notification API │───► stores notification (queued)
└──────────────────┘ └────────────────────┘
│ │
│ GET users │ reads users
▼ ▼
┌──────────────┐ ┌───────────────┐
│ User Service │ │ PostgreSQL DB │
└──────────────┘ └───────────────┘
▲
│ poll queued notifications
┌────────────────────┐
│ Dispatcher Worker │───► mock email/SMS push
└────────────────────┘

## 🏗 Architecture Diagram

