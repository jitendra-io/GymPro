import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import classRoutes from './routes/classRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import bmiRoutes from './routes/bmiRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Gym Project Backend API is running smoothly',
    timestamp: new Date().toISOString(),
    database: process.env.DB_NAME || 'gym_project',
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Gym Project Backend API',
    endpoints: {
      health: 'GET /api/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      currentUser: 'GET /api/auth/me (Protected)',
      members: 'GET/POST /api/members',
      classes: 'GET/POST /api/classes',
      workouts: 'GET/POST /api/workouts',
      bmi: 'GET/POST /api/bmi',
      dashboardStats: 'GET /api/dashboard/stats',
    },
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/bmi', bmiRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server and Sync Database
async function startServer() {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 Gym Backend server running at: http://localhost:${PORT}`);
      console.log(`📡 Database: MySQL (${process.env.DB_NAME || 'gym_project'}) via Sequelize ORM`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('❌ Failed to start backend server:', error.message);
    process.exit(1);
  }
}

startServer();

export default app;

