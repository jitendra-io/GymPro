import { Router } from 'express';
import { Member, GymClass, Workout } from '../models/index.js';

const router = Router();

// GET /api/dashboard/stats - Aggregate stats for gym dashboard
router.get('/stats', async (req, res) => {
  try {
    const [memberCount, classCount, workouts] = await Promise.all([
      Member.count({ where: { status: 'Active' } }),
      GymClass.count(),
      Workout.findAll({ order: [['workoutDate', 'DESC']], limit: 10 }),
    ]);

    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

    res.json({
      success: true,
      data: {
        activeMembers: memberCount,
        totalClasses: classCount,
        workoutsThisWeek: totalWorkouts,
        caloriesBurned: totalCalories,
        streakDays: 14,
        recentWorkouts: workouts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

