import { Router } from 'express';
import { BmiRecord } from '../models/index.js';

const router = Router();

// Helper to determine BMI Category
function getBmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi <= 24.9) return 'Normal weight';
  if (bmi <= 29.9) return 'Overweight';
  return 'Obese';
}

// GET /api/bmi - Get past BMI history
router.get('/', async (req, res) => {
  try {
    const records = await BmiRecord.findAll({
      order: [['recordedAt', 'DESC']],
      limit: 20,
    });
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/bmi - Calculate and save a BMI record
router.post('/', async (req, res) => {
  try {
    const { height, weight } = req.body;
    if (!height || !weight) {
      return res.status(400).json({
        success: false,
        message: 'Height (in cm) and weight (in kg) are required',
      });
    }

    const heightNum = Number(height);
    const weightNum = Number(weight);
    const heightInMeters = heightNum / 100;
    const bmi = parseFloat((weightNum / (heightInMeters * heightInMeters)).toFixed(1));
    const category = getBmiCategory(bmi);

    const record = await BmiRecord.create({
      heightCm: heightNum,
      weightKg: weightNum,
      bmi,
      category,
    });

    res.status(201).json({
      success: true,
      data: record,
      message: 'BMI calculation saved successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;

