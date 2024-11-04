const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
    required: true,
  },
  savedclips: [
    {
      type: Schema.Types.ObjectId,
      ref: 'voiceclip',
    },
  ],
  clipCount: {
    type: Number,
    default: 0,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

userSchema.virtual('clipCount').get(function () {
  return this.savedclips.length;
});

const User = model('User', userSchema);

module.exports = User;