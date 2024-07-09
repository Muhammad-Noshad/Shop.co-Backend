const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

async function verifyToken(req, res){
  const token = req.cookies?.accessToken;
  console.log("Cookies", req.cookies);
  if (!token) {
    return res.json({ isAuthenticated: false });
  }
  console.log("Token", token);

  const { email } = decodeToken(token, process.env.ACCESS_TOKEN_SECRET);
  console.log("Email", email);
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
      gender: user.gender,
      email: user.email,
      profilePic: user.profilePic,
      isGoogleLogIn: user.isGoogleLogIn,
  }});
}

function generateToken(user){
  return jwt.sign({
    _id: user._id,
    "email": user.email
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d"
  });
}

function decodeToken(token, key){
  return jwt.verify(token, key);
}

async function deleteToken(req, res){
  try{
    console.log("Before deleting", req.cookies);
    res.clearCookie('accessToken', {
      sameSite: 'None',
      path: '/',
      httpOnly: true,
      secure: true
    });
    console.log("After deleting", req.cookies);

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