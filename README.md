🚀 Dispatchly
A Microservices-Based Smart Notification Engine-
Node.js • Express • PostgreSQL • React • Worker/Dispatcher

<p align="center">
  <img alt="Dispatchly" src="https://img.shields.io/badge/Dispatchly-Notify%20Smartly-blue?logo=github" />
  <img alt="Architecture" src="https://img.shields.io/badge/architecture-microservices-lightgrey" />
  <img alt="Stack" src="https://img.shields.io/badge/stack-nodejs%20%7C%20react%20%7C%20postgres-blue" />
</p>

🔖 What is Dispatchly?
Dispatchly is a compact, real-world notification system built as microservices. It accepts notification requests (email / SMS / push mock), queues them, and a dispatcher worker processes deliveries with retry logic. The project demonstrates microservice architecture, worker-based dispatching, and a simple admin UI for sending and tracking notifications.

✨ Features (Built / Demo)
- User service: register / login / list users (JWT + bcrypt)
- Notification service: `POST /notify` to queue notifications
- Dispatcher worker: polls queued notifications, performs mock delivery, retry logic
- User preferences (email/sms/push toggles)
- React admin: login, select user, send notification, view logs
- All services use PostgreSQL (single DB for simplicity in demo)
- Clear README, sample curl tests, and resume-ready bullets

📁 Repo Structure
