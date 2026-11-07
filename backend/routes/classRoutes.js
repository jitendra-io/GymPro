import { Router } from 'express';
import { GymClass } from '../models/index.js';

const router = Router();

// GET /api/classes - Get all gym classes
router.get('/', async (req, res) => {
  try {
    const classes = await GymClass.findAll({
      order: [['id', 'ASC']],
    });
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/classes/:id - Get class by id
router.get('/:id', async (req, res) => {
  try {
    const gymClass = await GymClass.findByPk(req.params.id);
    if (!gymClass) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    res.json({ success: true, data: gymClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/classes - Add a new gym class
router.post('/', async (req, res) => {
  try {
    const { title, instructor, scheduleTime, level, capacity, description, image } = req.body;
    if (!title || !instructor || !scheduleTime) {
      return res.status(400).json({
        success: false,
        message: 'Title, instructor, and scheduleTime are required',
      });
    }

    const newClass = await GymClass.create({
      title,
      instructor,
      scheduleTime,
      level,
      capacity,
      description,
      image,
    });
    res.status(201).json({ success: true, data: newClass, message: 'Class added successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/classes/:id - Update gym class
router.put('/:id', async (req, res) => {
  try {
    const gymClass = await GymClass.findByPk(req.params.id);
    if (!gymClass) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    const { title, instructor, scheduleTime, level, capacity, description, image } = req.body;
    await gymClass.update({
      title,
      instructor,
      scheduleTime,
      level,
      capacity,
      description,
      image,
    });
    res.json({ success: true, data: gymClass, message: 'Class updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/classes/:id - Delete gym class
router.delete('/:id', async (req, res) => {
  try {
    const gymClass = await GymClass.findByPk(req.params.id);
    if (!gymClass) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    await gymClass.destroy();
    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

