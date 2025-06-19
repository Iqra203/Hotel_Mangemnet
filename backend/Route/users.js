// routes/users.js
import express from 'express';
import User from '../Models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
