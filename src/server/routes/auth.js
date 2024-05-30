const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, password, email, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      password: hashedPassword,
      email,
      gender,
      lastLogin: new Date()
    });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error during signup');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email, name });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    user.count += 1;
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.email === 'admin@email.com' ? 'admin' : 'user' }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Login failed');
  }
});

module.exports = router;
