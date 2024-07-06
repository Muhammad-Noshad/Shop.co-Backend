const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("./token");
require("dotenv").config();
const { jwtDecode } = require("jwt-decode");

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
  });

  return res.json({success: true, user: {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNo: user.phoneNo,
    dateOfBirth: user.dateOfBirth,
    email: user.email,
    password: user.password,
    profilePic: user.profilePic
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
    });
 
  const accessToken = generateToken(user);

  res.cookie("accessToken", accessToken, {
    sameSite: "strict",
    path: "/",
    httpOnly: true,
    maxAge: 24*60*60*1000,
  });

  return res.json({success: true, user: {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePic: user.profilePic
  }});
}

module.exports = {
  handleUserSignIn,
  handleGoogleSignIn,
}