# Why We Use This

## Helmet

Purpose

Adds secure HTTP headers automatically.

Protects against

- Clickjacking
- MIME sniffing
- Some XSS attacks

Usage

app.use(helmet())

---

## Cookie Parser

Reads cookies from incoming requests.

Without it

req.cookies

will be undefined.

---

## CORS

Allows frontend and backend on different origins to communicate.

Example

Frontend

localhost:5173

Backend

localhost:5000

Without CORS

Browser blocks request.

---

## JWT

Provides stateless authentication.

Server doesn't need to store sessions.

---

## bcrypt

Hashes passwords before storing them.

Never store passwords in plain text.

---

## dotenv

Loads environment variables from .env

Never hardcode secrets.

---

## nodemon

Automatically restarts server after file changes.

Development only.

---

## ApiError

Creates standardized application errors.

Does NOT send responses.

---

## errorHandler

Receives errors and sends response to client.

---

## asyncHandler

Automatically forwards async errors to errorHandler.

Removes repetitive try-catch blocks.

---

## SDK

Provides plug-and-play monitoring.

Developer only writes

app.use(pingNest())

instead of implementing monitoring manually.





# Why We Use This

## cookie-parser

Purpose:
Read cookies from incoming requests.

Without:

app.use(cookieParser())

This would fail:

req.cookies.accessToken

---

## jsonwebtoken

Purpose:
Generate and verify JWT tokens.

Functions:

jwt.sign()

jwt.verify()

---

## bcrypt

Purpose:
Hash passwords before storing.

Functions:

bcrypt.hash()

bcrypt.compare()

---

## verifyJWT Middleware

Purpose:
Protect routes.

Responsibilities:

- Read access token
- Verify token
- Load user
- Attach req.user

---

## Zod

Purpose:
Validate request body before controller execution.

Benefits:

- Cleaner controllers
- Consistent validation
- Better error handling

---

## HTTP-only Cookies

Purpose:
Secure token storage.

Benefits:

- Cannot be read by JavaScript
- Automatically sent by browser/Postman