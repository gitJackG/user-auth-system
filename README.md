# MERN Authentication System

A production-ready, full-stack authentication system built with the MERN stack, featuring JWT-based sessions, OAuth integration, and comprehensive security measures.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-app-frontend.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Demo Project Notice**: This is a portfolio demonstration project. Do not use real passwords.
> **Demo Project Notice**: This project is hosted on Render Free Tier so it may take up to 1 minute to load.

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
