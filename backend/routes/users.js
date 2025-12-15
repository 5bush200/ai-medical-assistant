import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory user storage
const users = new Map();

// POST - Create/Register a new user
router.post('/register', (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check if user already exists
    const existingUser = Array.from(users.values()).find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const userId = uuidv4();
    const user = {
      id: userId,
      name,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preferences: {
        notifications: true,
        language: 'en',
        theme: 'light'
      }
    };

    users.set(userId, user);

    res.status(201).json({
      success: true,
      user,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// POST - Login (simplified)
router.post('/login', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = Array.from(users.values()).find(u => u.email === email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user,
      token: `Bearer ${uuidv4()}`
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// GET - Get user profile
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    if (!users.has(userId)) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: users.get(userId)
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

// PUT - Update user profile
router.put('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const { name, preferences } = req.body;

    if (!users.has(userId)) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users.get(userId);
    if (name) user.name = name;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    user.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE - Delete user account
router.delete('/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    if (!users.has(userId)) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.delete(userId);

    res.json({
      success: true,
      message: 'User account deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
