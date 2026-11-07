import { Router } from 'express';
import { Member } from '../models/index.js';

const router = Router();

// GET /api/members - Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/members/:id - Get single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/members - Create a new member
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, plan, status } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const existing = await Member.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Member with this email already exists' });
    }

    const member = await Member.create({ name, email, phone, plan, status });
    res.status(201).json({ success: true, data: member, message: 'Member registered successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/members/:id - Update member
router.put('/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    const { name, email, phone, plan, status } = req.body;
    await member.update({ name, email, phone, plan, status });
    res.json({ success: true, data: member, message: 'Member updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/members/:id - Delete member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    await member.destroy();
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

