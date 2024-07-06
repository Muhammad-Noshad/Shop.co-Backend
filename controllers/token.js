const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

function generateToken(user, duration = "1d"){
  return jwt.sign({
    _id: user._id,
    "email": user.email
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: duration
  });
}

async function verifyToken(req, res){
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  const { email } = decodeToken(token, process.env.ACCESS_TOKEN_SECRET);

  if(!email)
    res.json({ isAuthenticated: false });

  const user = await User.findOne({
    email,
  });

  return res.json({ isAuthenticated: true, user: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNo: user.phoneNo,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      password: user.password,
      profilePic: user.profilePic
  }});
}

function decodeToken(token, key){
  return jwt.verify(token, key);
}

async function deleteToken(req, res){
  try{
    res.clearCookie("accessToken");

    return res.json({ success: true });
  }
  catch{
    return res.json({ success: false });
  }
}

module.exports = {
  generateToken,
  verifyToken,
  deleteToken,
  decodeToken,
};