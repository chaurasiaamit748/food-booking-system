# FASTWAY Delivery System

A full-stack MERN delivery operations dashboard with role-based access for admins and delivery partners.

## Features
- JWT authentication with bcrypt password hashing and role protection
- Admin order creation, search/filtering, delivery assignment, history, and driver management
- Delivery partner dashboard with assigned-order scoping and enforced status flow
- Responsive React interface with live dashboard statistics and status badges
- MongoDB persistence through Mongoose and seeded demo accounts

## Stack
React + Vite, React Router, Axios, Lucide React, Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, dotenv, and CORS.

## Structure
`client/` contains the Vite frontend. `server/` contains models, controllers, middleware, routes, configuration, and seed scripts.

## Setup
Prerequisites: Node.js 18+, npm, and a running MongoDB instance.

```bash
npm install
npm run install:all
```

Copy `server/.env.example` to `server/.env` and set `MONGO_URI` and a strong `JWT_SECRET`. The default client URL is `http://localhost:5173`.

Run both applications from the root:

```bash
npm run dev
```

Or run them independently:

```bash
npm run dev --prefix server
npm run dev --prefix client
```

Seed the demo users after configuring MongoDB:

```bash
npm run seed --prefix server
```

Demo credentials: `admin@fastway.com` / `Admin@123` and `delivery@fastway.com` / `Delivery@123`. Change these credentials for a real deployment.

## API
- `POST /api/auth/login`, `GET /api/auth/me`
- `GET/POST /api/orders`, `GET/PUT/DELETE /api/orders/:id`
- `PATCH /api/orders/:id/assign`, `PATCH /api/orders/:id/status`
- `GET/POST /api/users/delivery-boys`, `PUT /api/users/delivery-boys/:id`
- `PATCH /api/users/delivery-boys/:id/status`
- `GET /api/dashboard/admin`, `GET /api/dashboard/delivery`

## Future Improvements
Add pagination, audit logs, real-time driver location, email/SMS notifications, and production deployment configuration.
