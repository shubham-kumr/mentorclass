import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { mentorProfile } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'mentor' && mentorProfile) {
      user.mentorProfile = {
        ...user.mentorProfile,
        ...mentorProfile
      };
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all mentors
router.get('/mentors', auth, async (req, res) => {
  try {
    console.log('Fetching mentors...');
    const mentors = await User.find({ 
      role: 'mentor'
    }).select('name email mentorProfile role');
    
    console.log('Found mentors:', mentors);
    res.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ message: 'Error fetching mentors' });
  }
});

// Add this route to handle becoming a mentor
router.put('/become-mentor', auth, async (req, res) => {
  try {
    const { mentorProfile } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = 'mentor';
    user.mentorProfile = mentorProfile;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Debug route to check mentors (remove in production)
router.get('/debug/mentors', async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' });
    res.json({
      count: mentors.length,
      mentors: mentors.map(m => ({
        id: m._id,
        name: m.name,
        email: m.email,
        role: m.role,
        hasProfile: !!m.mentorProfile
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking mentors' });
  }
});

// Get specific mentor
router.get('/mentors/:mentorId', auth, async (req, res) => {
  try {
    const mentor = await User.findOne({ 
      _id: req.params.mentorId,
      role: 'mentor'
    }).select('name email mentorProfile');

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json(mentor);
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({ message: 'Error fetching mentor profile' });
  }
});

// Update mentor profile
router.put('/mentor-profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || user.role !== 'mentor') {
      return res.status(403).json({ message: 'Only mentors can update their profile' });
    }

    const { bio, expertise, experience, projects, socials } = req.body;

    // Update mentor profile
    user.mentorProfile = {
      ...user.mentorProfile,
      bio: bio || user.mentorProfile.bio,
      expertise: expertise || user.mentorProfile.expertise,
      experience: experience || user.mentorProfile.experience,
      projects: projects || user.mentorProfile.projects,
      socials: {
        ...user.mentorProfile.socials,
        ...socials
      }
    };

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating mentor profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

export default router; 