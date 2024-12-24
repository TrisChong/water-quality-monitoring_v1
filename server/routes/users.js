import express from 'express';
import { auth, requireAdmin } from '../middleware/auth.js';
import User from '../models/User.js';
import { log } from '../utils/logger.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', [auth, requireAdmin], async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    log.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const userId = req.user.id;

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: userId } 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email already in use' 
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, phone },
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json(user);
  } catch (error) {
    log.error(`Profile update error: ${error.message}`);
    res.status(500).json({ 
      message: 'Failed to update profile' 
    });
  }
});

// Delete user (admin only)
router.delete('/:id', [auth, requireAdmin], async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (userToDelete._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await userToDelete.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    log.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;