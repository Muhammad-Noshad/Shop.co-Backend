const User = require('../models/user');

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email }).populate('profilePic').exec();
    return user; 
  } catch (error) {
    console.error('Error retrieving user by email:', error);
  }
}

module.exports = { getUserByEmail };