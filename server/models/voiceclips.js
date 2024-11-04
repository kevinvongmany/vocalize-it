const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const voiceclipSchema = new Schema({
  title: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
  },
  // saved book id from GoogleBooks
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  audioURL: {
    type: String,
    required: true,
  },
  Format: {
    type: String, 
    emum: ['mp3', 'wav', 'ogg'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const voiceclip = model('voiceclip', voiceclipSchema);

module.exports = voiceclip;
