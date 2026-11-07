import { Router } from 'express';
import { Workout } from '../models/index.js';

const router = Router();

// GET /api/workouts - Get all logged workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.findAll({
      order: [['workoutDate', 'DESC']],
      limit: 50,
    });
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/workouts - Log a new workout
router.post('/', async (req, res) => {
  try {
    const { workoutType, durationMinutes, caloriesBurned, notes, workoutDate } = req.body;
    if (!workoutType) {
      return res.status(400).json({ success: false, message: 'workoutType is required' });
    }

    const workout = await Workout.create({
      workoutType,
      durationMinutes: durationMinutes ? Number(durationMinutes) : 45,
      caloriesBurned: caloriesBurned ? Number(caloriesBurned) : 300,
      notes,
      workoutDate: workoutDate || new Date(),
    });

    res.status(201).json({ success: true, data: workout, message: 'Workout logged successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/workouts/:id - Delete workout log
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout log not found' });
    }
    await workout.destroy();
    res.json({ success: true, message: 'Workout log removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

