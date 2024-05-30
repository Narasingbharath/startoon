const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get current user's details
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Error fetching user data');
  }
});

// Get all users (admin only)
router.get('/admin/users', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }

  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

module.exports = router;
