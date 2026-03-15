# Restaurant Reservation System

A full-stack restaurant reservation platform built with **Node.js + Express** (backend), **React + Vite** (frontend), and **PlanetScale** (MySQL-compatible serverless database).

---

## 📁 Project Structure

```
restaurant-reservation-system/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js         # PlanetScale connection pool
│   │   │   └── schema.sql    # Database schema
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth & error handler
│   │   ├── models/           # Data access layer
│   │   └── routes/           # Express routers
│   ├── .env.example
│   └── package.json
│
└── frontend/                 # React + Vite SPA
    ├── src/
    │   ├── __tests__/        # Component tests (Vitest)
    │   ├── components/       # Shared UI components
    │   ├── context/          # React Context (auth)
    │   ├── hooks/            # Custom hooks
    │   ├── pages/            # Route-level page components
    │   └── services/         # Axios API wrappers
    ├── .env.example
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- A free [PlanetScale](https://planetscale.com) account

### 1 – Create the PlanetScale database

1. Sign in at [app.planetscale.com](https://app.planetscale.com) and create a new database named `restaurant_reservation`.
2. Open a **Console** tab and paste the contents of `backend/src/config/schema.sql` to create the tables.
3. Go to **Connect → Node.js** and copy the connection string values.

### 2 – Backend setup

```bash
cd backend
cp .env.example .env
# Fill in DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, JWT_SECRET
npm install
npm run dev
# → http://localhost:3001
```

### 3 – Frontend setup

```bash
cd frontend
cp .env.example .env   # optional – Vite proxies /api automatically in dev
npm install
npm run dev
# → http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default `3001`) |
| `NODE_ENV` | `development` or `production` |
| `DATABASE_HOST` | PlanetScale host |
| `DATABASE_USERNAME` | PlanetScale username |
| `DATABASE_PASSWORD` | PlanetScale password |
| `DATABASE_NAME` | Database name |
| `JWT_SECRET` | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | JWT lifetime (e.g. `7d`) |
| `CORS_ORIGIN` | Comma-separated list of allowed origins |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | API base URL (not needed in dev – Vite proxy is used) |

---

## 📡 API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register a new user |
| POST | `/api/auth/login` | — | Login and receive a JWT |
| GET  | `/api/auth/me` | JWT | Get current user |
| GET  | `/api/restaurants` | — | List all restaurants |
| GET  | `/api/restaurants/:id` | — | Get a single restaurant |
| POST | `/api/restaurants` | Admin | Create a restaurant |
| PUT  | `/api/restaurants/:id` | Admin | Update a restaurant |
| DELETE | `/api/restaurants/:id` | Admin | Delete a restaurant |
| GET  | `/api/reservations` | JWT | List user's reservations (admins see all) |
| POST | `/api/reservations` | JWT | Create a reservation |
| PUT  | `/api/reservations/:id` | JWT | Update a reservation |
| DELETE | `/api/reservations/:id` | JWT | Cancel a reservation |

---

## 🧪 Running Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Vite 8, Axios |
| Backend | Node.js 18+, Express 5, express-validator, JWT, bcryptjs |
| Database | PlanetScale (MySQL-compatible serverless DB) |
| DB Driver | mysql2 / @planetscale/database |