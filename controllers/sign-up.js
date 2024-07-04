const User = require("../models/user");
const bcrypt = require("bcrypt");
const { GridFSBucket, ObjectId } = require('mongodb');
const { getDB } = require("../connectDB");

async function handleUserSignUp(req, res) {
  const { firstName, lastName, phoneNo, dateOfBirth, email, password } = req.body;

  try {
    const isAlreadyPresent = await User.findOne({ email });

    if (isAlreadyPresent) {
      return res.json({ success: false, message: "Email is already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const bucket = new GridFSBucket(getDB()); 

    const file = req.file;

    const uploadStream = bucket.openUploadStream(file.originalname);
    uploadStream.end(file.buffer);

    uploadStream.on('error', (error) => {
      console.error('Error uploading to GridFS:', error);
      res.status(500).json({ success: false, message: 'Error uploading profile picture' });
    });

    uploadStream.on('finish', async () => {
      const profilePicId = uploadStream.id;

      await User.create({
        lastName,
        firstName,
        phoneNo,
        dateOfBirth,
        email,
        password: hashedPassword,
        profilePic: profilePicId 
      });

      res.json({ success: true, message: 'User signed up successfully' });
    });
  } catch (error) {
    console.error('Error handling user signup:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {
  handleUserSignUp,
};
