const bcrypt = require("bcrypt");
require("dotenv").config();
const { jwtDecode } = require("jwt-decode");
const cloudinary = require("../utils/cloudinary");
const { generateToken } = require("./token");
const User = require("../models/user");

async function handleUserSignIn(req, res){
  const { email, password } = req.body;

  let user = await User.findOne({
    email
  });

  if(!user)
    return res.json({success: false, message: "No such Email found!"});

  const passwordMatch = await bcrypt.compare(password, user.password);

  if(!passwordMatch)
    return res.json({success: false, message: "Invalid password!"});

  const accessToken = generateToken(user);

  res.cookie("accessToken", accessToken, {
    sameSite: "strict",
    path: "/",
    httpOnly: true,
    maxAge: 24*60*60*1000,
    secure: true,
  });

  return res.json({success: true, user: {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNo: user.phoneNo,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    email: user.email,
    profilePic: user.profilePic,
    isGoogleLogIn: user.isGoogleLogIn,
  }});
}

async function handleGoogleSignIn(req, res){
  const { credential } = req.body;

  const decoded = jwtDecode(credential);

  let user = await User.findOne({ email: decoded.email });

  if(!user)
    user = await User.create({
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      email: decoded.email,
      profilePic: decoded.picture,
      isGoogleLogIn: true,
    });
 
  const accessToken = generateToken(user);

  res.cookie("accessToken", accessToken, {
    sameSite: "strict",
    path: "/",
    httpOnly: true,
    maxAge: 24*60*60*1000,
    secure: true,
  });

  return res.json({success: true, user: {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNo: user.phoneNo,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    email: user.email,
    profilePic: user.profilePic,
    isGoogleLogIn: user.isGoogleLogIn,
  }});
}

async function handleUserSignUp(req, res) {
  const { firstName, lastName, phoneNo, dateOfBirth, gender, email, password } = req.body;

  try {
    const isAlreadyPresent = await User.findOne({ email });

    if (isAlreadyPresent) {
      return res.json({ success: false, message: "Email is already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageURL;

    await cloudinary.uploader.upload(req.file.path, function(err, result){
      if(err){
        return res.json({ success: false, message: 'An error occured while uploading image' });
      }

      imageURL = result.secure_url;
    })

    await User.create({
      firstName,
      lastName,
      phoneNo,
      dateOfBirth,
      gender,
      email,
      password: hashedPassword,
      profilePic: imageURL,
      isGoogleLogIn: false,
    });

    res.json({ success: true, message: 'User signed up successfully' });
   
  } catch (error) {
    res.json({ success: false, message: 'Server error' });
  }
}

module.exports = {
  handleUserSignIn,
  handleGoogleSignIn,
  handleUserSignUp,
}