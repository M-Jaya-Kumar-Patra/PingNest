# Architecture Decisions

## Why MERN?

Reasons

- Already experienced
- Faster development
- Easier deployment

---

## Why MongoDB?

Telemetry data is semi-structured.

Benefits

- Flexible schema
- Easy aggregation
- Quick iteration

---

## Why Separate SDK?

SDK is an independent package.

Future:

npm publish

should publish only

sdk/

not the whole project.

---

## Why Service Layer?

Instead of

Controller
↓

Database

Use

Controller
↓

Service
↓

Model

Benefits

- Cleaner code
- Reusable logic
- Easy testing

---

## Why ApiResponse?

Ensures every response has the same format.

Without ApiResponse

Every controller returns different JSON.

With ApiResponse

Every response is standardized.

---

## Why ApiError?

Represents a custom application error.

Stores:

- statusCode
- message

Does NOT send response.

---

## Why errorHandler?

Single middleware responsible for sending error responses.

Keeps all error formatting in one place.

---

## Why asyncHandler?

Automatically catches async errors.

Avoids writing try-catch in every controller.

---

## Why SDK + Uptime Monitoring?

SDK

- Route analytics
- Response time
- Errors

Health Checks

- Detect if app is completely down

Together they provide better monitoring.



## Why Use Mongoose Pre-save Hooks?

Passwords should always be hashed before being stored.

Instead of hashing passwords in every controller, a Mongoose pre-save hook automatically hashes them whenever a user document is saved.

Benefits:
- No duplicated hashing logic
- Safer
- Less chance of developer mistakes 



Why use logger utility?

To avoid coupling application code to console.log.

Future logging libraries can be integrated
without changing business logic.

## Why Hash Passwords In Pre-save Hook?

Ensures passwords are always hashed.

Avoids duplication across controllers.

---

## Why Put JWT Methods On User Model?

Keeps token logic close to the User entity.

Improves encapsulation and reusability.

Validation is handled through middleware to keep controllers focused on business logic.



# Authentication Decisions

## Why Access Token + Refresh Token?

Access Token:
- Short lived
- Better security

Refresh Token:
- Long lived
- Better user experience

This combination balances security and usability.

---

## Why HTTP-only Cookies?

Alternative:
localStorage

Problem:
JavaScript can access tokens.

Chosen:
HTTP-only Cookies

Benefits:
- More secure
- Automatically sent by browser

---

## Why Authentication Middleware?

Instead of:

Controller
 ↓
Verify JWT

everywhere

Use:

Middleware
 ↓
Controller

Benefits:
- Reusable
- Cleaner controllers
- Centralized security

---

## Why Store Refresh Token In Database?

Benefits:

- Logout support
- Token rotation
- Invalidate old sessions

---

## Why Use verifyJWT Middleware?

Ensures only authenticated users can access protected routes.

Provides:

req.user

to controllers.

---

## Why Remove getCurrentUser Service?

Middleware already fetches user.

Using a service would introduce unnecessary database queries.

Current Flow:

verifyJWT
 ↓
req.user
 ↓
Controller



Why generate API keys during project creation?

Each project must have a unique identity for SDK authentication.

SDK requests will use API keys rather than user credentials.




Analytics endpoints verify project ownership before returning data.

This prevents users from accessing telemetry and analytics belonging to other users.

Pattern used:

{
  _id: projectId,
  owner: userId
}



## Why Service Layer?

Controllers only handle HTTP requests and responses.

Business logic lives in services.

Benefits:
- Reusable logic
- Easier testing
- Cleaner controllers

Example:
auth.controller.js → auth.service.js
project.controller.js → project.service.js
analytics.controller.js → analytics.service.js



## Why Socket.IO Rooms?

Initially telemetry events were broadcast globally:

io.emit("telemetry:new", telemetry)

This meant every connected dashboard would receive telemetry from every project.

The design was changed to project-specific rooms:

io.to(projectId).emit("telemetry:new", telemetry)

Benefits:
- Better scalability
- Improved security
- Reduced network traffic
- Correct project isolation