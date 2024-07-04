const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  profilePic: { 
    type: mongoose.Types.ObjectId, 
    ref: 'fs.files',
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;