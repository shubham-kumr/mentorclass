import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import sessionRoutes from './routes/session.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/sessions', sessionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit if cannot connect to database
  });

// Add this to check database connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Add this after your mongoose.connect()
await mongoose.connection.collection('sessions').dropIndex('mentor_1_mentee_1_status_1');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 