# MERN Authentication System

A production-ready, full-stack authentication system built with the MERN stack, featuring JWT-based sessions, OAuth integration, and comprehensive security measures.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-app-frontend.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Demo Project Notice**: This is a portfolio demonstration project. Do not use real passwords.

---

## Features

### Core Authentication
- ✅ **Email/Password Authentication** - Secure user registration and login
- ✅ **JWT Session Management** - Access tokens (15min) + Refresh tokens (30d)
- ✅ **Email Verification** - Verify user emails with secure codes
- ✅ **Password Reset Flow** - Secure password recovery via email
- ✅ **Session Management** - View and revoke active sessions across devices

### OAuth Integration
- ✅ **Google OAuth 2.0**
- ✅ **GitHub OAuth**
- ✅ **Discord OAuth**
- ✅ **Facebook OAuth**
- ✅ **Smart Account Linking** - Link multiple OAuth providers to one account

### Security
- ✅ **Helmet.js** - Security headers (CSP, X-Frame-Options, etc.)
- ✅ **Rate Limiting** - Protection against brute force attacks
- ✅ **CSRF Protection** - OAuth state validation with httpOnly cookies
- ✅ **HttpOnly Cookies** - Secure token storage preventing XSS
- ✅ **Bcrypt Hashing** - Industry-standard password encryption (10 rounds)
- ✅ **Input Validation** - Zod schema validation on all endpoints

---

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query** - Server state management
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **Passport.js** - OAuth strategies
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **Helmet** - Security middleware

### Infrastructure
- **Render** - Backend hosting
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Database hosting
- **Resend** - Email service

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Resend API key for emails
- OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gitJackG/user-auth-system.git
   cd user-auth-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```env
   NODE_ENV=development
   PORT=4004
   MONGO_URI=your_mongodb_connection_string
   APP_ORIGIN=http://localhost:5173
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   EMAIL_SENDER=your_email@example.com
   RESEND_API_KEY=your_resend_api_key
   
   # OAuth (optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   # ... other OAuth providers
   ```

   Start backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:4004
   ```

   Start frontend:
   ```bash
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4004

---

## Project Structure

```
user-auth-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── constants/       # Environment variables, HTTP codes
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Auth, error handling, rate limiting
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Helper functions
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── config/          # API client, React Query
    │   ├── hooks/           # Custom React hooks
    │   ├── pages/           # Route components
    │   └── lib/             # Utilities
    └── package.json
```

---

## Security Features

This project implements multiple layers of security:

1. **Authentication**
   - JWT with separate access/refresh tokens
   - Refresh token rotation on use
   - Server-side session revocation

2. **Cookie Security**
   - `httpOnly` flag prevents JavaScript access
   - `secure` flag in production (HTTPS only)
   - `sameSite` protection against CSRF

3. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Password strength validation
   - Secure password reset flow

4. **OAuth Security**
   - State parameter validation
   - CSRF protection with httpOnly cookies
   - Secure callback handling

5. **API Security**
   - Helmet.js security headers
   - Rate limiting on auth endpoints
   - Input validation with Zod
   - CORS configuration

---

## Deployment

This project is configured for deployment on:
- **Backend**: Render
- **Frontend**: Vercel

---

## License

This project is licensed under the MIT License.

---

## Credits

Based on [mern-auth-jwt](https://github.com/nikitapryymak/mern-auth-jwt) by [nikitapryymak](https://github.com/nikitapryymak)

---

## Contact

For questions or feedback, please open an issue on GitHub.
