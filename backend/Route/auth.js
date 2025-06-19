import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

// Login
// In your /login route (auth.js)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin login
  if (email === 'admin@luxurystay.com' && password === 'admin123') {
    return res.json({
      token: jwt.sign({ id: 'admin', role: 'admin' }, 'jwtsecret', { expiresIn: '1d' }),
      role: 'admin',
      name: 'Admin'
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password.' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'jwtsecret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role,
      name: user.name // Ensure this is included
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

export default router;
