import mongoose from 'mongoose';
import express from 'express';
import auth from '../middleware/auth.js';
import Session from '../models/Session.js';
import User from '../models/User.js';

const router = express.Router();

// Request a session
router.post('/request', auth, async (req, res) => {
  try {
    console.log('Received session request:', req.body);
    const { mentorId, scheduledDate } = req.body;
    
    console.log('Checking for existing request...');
    // Check if there's already a pending request
    const existingRequest = await Session.findOne({
      mentor: mentorId,
      mentee: req.userId,
      status: 'pending'
    });

    if (existingRequest) {
      console.log('Found existing request');
      return res.status(400).json({ 
        message: 'You already have a pending request with this mentor' 
      });
    }

    console.log('Creating new session request...');
    // Create new session request
    const session = new Session({
      mentor: mentorId,
      mentee: req.userId,
      scheduledDate: new Date(scheduledDate),
      status: 'pending'
    });

    await session.save();
    console.log('Session saved:', session);

    // Update mentor's pending requests count
    await User.findByIdAndUpdate(mentorId, {
      $inc: { 'mentorProfile.pendingRequests': 1 }
    });
    console.log('Updated mentor stats');

    res.status(201).json({
      message: 'Session request sent successfully',
      session
    });
  } catch (error) {
    console.error('Session request error:', error);
    res.status(500).json({ message: 'Error creating session request' });
  }
});

// Get session requests (for mentor)
router.get('/requests', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.userId })
      .populate('mentee', 'name email')
      .sort('-createdAt');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching session requests' });
  }
});

// Get upcoming sessions (for mentee)
router.get('/upcoming', auth, async (req, res) => {
  try {
    const sessions = await Session.find({
      mentee: req.userId,
      scheduledDate: { $gte: new Date() }
    })
      .populate('mentor', 'name mentorProfile')
      .sort('scheduledDate');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming sessions' });
  }
});

// Update session status
router.patch('/:sessionId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const sessionId = req.params.sessionId;
    const userId = req.userId;

    console.log('Session Update Request:', {
      sessionId,
      status,
      userId
    });

    // Validate session ID
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: 'Invalid session ID' });
    }

    // Find the session
    const session = await Session.findById(sessionId);
    console.log('Found session:', session);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Verify mentor
    const mentorId = session.mentor.toString();
    if (mentorId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update session
    const oldStatus = session.status;
    
    // Update the session using findOneAndUpdate to avoid duplicate key errors
    const updatedSession = await Session.findOneAndUpdate(
      { _id: sessionId },
      { $set: { status: status } },
      { 
        new: true,
        runValidators: true
      }
    );

    // Update mentor stats
    if (oldStatus === 'pending' && (status === 'accepted' || status === 'rejected')) {
      await User.findByIdAndUpdate(
        userId,
        { $inc: { 'mentorProfile.pendingRequests': -1 } },
        { new: true }
      );
    }

    // Get populated session
    const populatedSession = await Session.findById(sessionId)
      .populate('mentee', 'name email')
      .populate('mentor', 'name email');

    console.log('Session updated successfully:', populatedSession);
    res.json(populatedSession);

  } catch (error) {
    console.error('Session update error:', error);
    res.status(500).json({ 
      message: 'Failed to update session',
      error: error.message 
    });
  }
});

// Get session stats
router.get('/stats', auth, async (req, res) => {
  try {
    console.log('Fetching stats for user:', req.userId);
    const [total, pending, completed] = await Promise.all([
      Session.countDocuments({ mentor: req.userId }),
      Session.countDocuments({ mentor: req.userId, status: 'pending' }),
      Session.countDocuments({ mentor: req.userId, status: 'completed' })
    ]);
    
    const stats = {
      totalSessions: total,
      pendingRequests: pending,
      completedSessions: completed
    };
    console.log('Stats:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching session stats' });
  }
});

// Get mentor sessions
router.get('/mentor-sessions', auth, async (req, res) => {
  try {
    console.log('Fetching sessions for mentor:', req.userId);
    const sessions = await Session.find({ 
      mentor: req.userId 
    })
    .populate('mentee', 'name email')
    .sort('-scheduledDate');
    
    console.log(`Found ${sessions.length} sessions for mentor`);
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching mentor sessions:', error);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
});

// Get mentee sessions
router.get('/mentee-sessions', auth, async (req, res) => {
  try {
    console.log('Fetching sessions for mentee:', req.userId);
    const sessions = await Session.find({ 
      mentee: req.userId 
    })
    .populate('mentor', 'name email mentorProfile')
    .sort('-scheduledDate');
    
    console.log(`Found ${sessions.length} sessions for mentee`);
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching mentee sessions:', error);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
});

// Get all mentors
router.get('/mentors', auth, async (req, res) => {
  try {
    const mentors = await User.find({ 
      role: 'mentor',
      'mentorProfile.bio': { $exists: true }
    })
    .select('name email mentorProfile')
    .sort('-createdAt');
    
    console.log('Available mentors:', mentors);
    res.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ message: 'Error fetching mentors' });
  }
});

export default router; 