import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { log } from '../utils/logger.js';

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role, phone } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or username already exists'
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      role: role || 'user',
      phone
    });

    await user.save();
    log.success(`New user registered: ${username}`);

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    log.error('Registration error:', error);
    res.status(500).json({
      message: 'Registration failed. Please try again.'
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }
    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    log.error('Login error:', error);
    res.status(500).json({ 
      message: 'Login failed. Please try again.' 
    });
  }
});

export default router;
