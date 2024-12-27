import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

// Signup route
router.post('/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['mentor', 'mentee']).withMessage('Invalid role')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, role } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        role,
        mentorProfile: role === 'mentor' ? {
          occupation: '',
          qualification: '',
          expertise: [],
          bio: '',
          socials: {
            linkedin: '',
            twitter: '',
            github: ''
          }
        } : undefined
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login route
router.post('/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Add test mentor route (remove in production)
router.post('/create-test-mentor', async (req, res) => {
  try {
    const testMentor = new User({
      name: 'Test Mentor',
      email: 'mentor@test.com',
      password: await bcrypt.hash('password123', 10),
      role: 'mentor',
      mentorProfile: {
        bio: 'Experienced software developer with 5 years of experience',
        expertise: ['JavaScript', 'React', 'Node.js'],
        experience: '5 years of full-stack development',
        socials: {
          github: 'https://github.com/testmentor',
          linkedin: 'https://linkedin.com/in/testmentor'
        }
      }
    });

    await testMentor.save();
    res.status(201).json({ message: 'Test mentor created successfully' });
  } catch (error) {
    console.error('Error creating test mentor:', error);
    res.status(500).json({ message: 'Error creating test mentor' });
  }
});

export default router; 