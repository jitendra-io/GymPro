# Gym Project - Node.js Backend with MySQL & Sequelize ORM

A minimal, robust, and modern RESTful API backend for the **Gym Project**, built with **Node.js**, **Express**, **MySQL**, and **Sequelize ORM**.

---

## 📌 Features

- **Database Auto-Provisioning**: Automatically verifies and creates the database `gym_project` in MySQL if it doesn't already exist.
- **Sequelize ORM**: Fully typed schemas and models for `Member`, `GymClass`, `Workout`, and `BmiRecord`.
- **CORS Configured**: Ready to communicate with the Vite + React frontend (`http://localhost:5173`).
- **RESTful Endpoints**: Endpoints for Members, Classes, Workouts, BMI calculation, and Dashboard stats.
- **Database Seeder**: Pre-configured sample gym classes, workouts, members, and demo admin account (`jiten@gympro.com` / `password123`).

---

## ⚙️ Configuration (`.env`)

A `.env` file is located in the `backend/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gym_project
DB_USER=root
DB_PASSWORD=jiten
```

---

## 🚀 How to Run

### From the Root Directory:
```bash
# Run backend with auto-reload (watch mode)
npm run backend

# Or run database seeder
npm run backend:seed

# Or run normal start
npm run backend:start
```

### From the `backend` Directory:
```bash
cd backend
npm install
npm run seed  # (Optional: Populates sample classes and members)
npm run dev   # Starts server with file watching on port 
```

---

## 📡 API Endpoints Overview

### 🔐 Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user (name, email, password, phone, role) |
| `POST` | `/api/auth/login` | Login user & return JWT token |
| `GET` | `/api/auth/me` | Get authenticated user profile (`Bearer <token>`) |
| `PUT` | `/api/auth/profile` | Update profile info / password (`Bearer <token>`) |

### 🏋️ Gym Resources

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & MySQL status |
| `GET` | `/api/members` | Get all gym members |
| `POST` | `/api/members` | Register a new member |
| `GET` | `/api/members/:id` | Get member details |
| `PUT` | `/api/members/:id` | Update member details |
| `DELETE` | `/api/members/:id` | Delete member |
| `GET` | `/api/classes` | Get all available gym classes |
| `POST` | `/api/classes` | Add a new gym class |
| `GET` | `/api/classes/:id` | Get single gym class details |
| `DELETE` | `/api/classes/:id` | Delete gym class |
| `GET` | `/api/workouts` | Get workout history |
| `POST` | `/api/workouts` | Log a new workout |
| `GET` | `/api/bmi` | Get past BMI calculation history |
| `POST` | `/api/bmi` | Calculate and store BMI record |
| `GET` | `/api/dashboard/stats` | Dashboard aggregated statistics |

