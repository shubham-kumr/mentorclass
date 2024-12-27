import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  zoomLink: {
    type: String
  }
}, {
  timestamps: true
});

// Create a non-unique compound index for better query performance
sessionSchema.index({ mentor: 1, mentee: 1, status: 1 });

const Session = mongoose.model('Session', sessionSchema);

export default Session; 