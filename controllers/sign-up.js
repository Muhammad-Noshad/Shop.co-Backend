const User = require("../models/user");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");

async function handleUserSignUp(req, res) {
  const { firstName, lastName, phoneNo, dateOfBirth, email, password } = req.body;

  try {
    const isAlreadyPresent = await User.findOne({ email });

    if (isAlreadyPresent) {
      return res.json({ success: false, message: "Email is already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageURL;

    await cloudinary.uploader.upload(req.file.path, function(err, result){
      if(err){
        console.log(err);
      }

      imageURL = result.secure_url;
    })

    await User.create({
      firstName,
      lastName,
      phoneNo,
      dateOfBirth,
      email,
      password: hashedPassword,
      profilePic: imageURL
    });

    res.json({ success: true, message: 'User signed up successfully' });
   
  } catch (error) {
    console.error('Error handling user signup:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {
  handleUserSignUp,
};
