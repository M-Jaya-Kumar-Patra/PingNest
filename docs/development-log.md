# Development Log

## Day 1

Completed

✅ Project finalized

Name:

PingNest

---

Finalized Architecture

backend/
dashboard/
sdk/

---

Selected Tech Stack

React

Express

MongoDB

JWT

Socket.IO

JavaScript

---

Designed MVP

Authentication

Projects

SDK

Metrics

Dashboard

Uptime Monitoring

---

Created project structure.

Initialized backend.

Installed dependencies.

Learned:

- SDK architecture
- Middleware
- ApiError
- asyncHandler
- Helmet




# Day 2

Completed:

✅ Authentication System
✅ Password Hashing
✅ JWT Generation
✅ Access Token
✅ Refresh Token
✅ Cookie Authentication
✅ Protected Routes
✅ Current User Endpoint

Endpoints:

POST /register

POST /login

GET /me

Major Learning:

How cookies, JWT, middleware, and protected routes work together.

Architecture:

Login
 ↓
Cookies
 ↓
verifyJWT
 ↓
req.user
 ↓
Protected Controller





# Day 3

Completed Project Module

Features:
- Create Project
- View Projects
- View Single Project
- Delete Project
- API Key Rotation

Major Learning:
Multi-tenant ownership checks using:

{
  _id: projectId,
  owner: userId
}

This prevents unauthorized access to other users' resources.




