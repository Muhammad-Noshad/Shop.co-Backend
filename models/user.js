const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },
  dateOfBirth: {
    type: Date,
  },
  profilePic: { 
    type: String, 
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  isGoogleLogIn: {
    type: Boolean,
  }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;