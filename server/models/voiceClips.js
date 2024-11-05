const mongoose = require('mongoose');
const voiceClipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // assuming you have a User model
    required: true
  },
  duration: {
    type: Number,  // duration in seconds
    required: true
  },
  audioUrl: {
    type: String,  // URL to the file if stored in cloud storage (e.g., AWS S3)
    required: true
  },
  format: {
    type: String,
    enum: ['mp3', 'wav', 'ogg'],  // acceptable audio formats
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,  // to help categorize or search voice clips
    trim: true
  }]
});
module.exports = mongoose.model('VoiceClip', voiceClipSchema);
