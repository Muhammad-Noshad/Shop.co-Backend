const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

async function verifyToken(req, res){
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  let userEmail;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if(error)
      res.json({ isAuthenticated: false });
      userEmail = decoded.email;
  }); 

  const user = await User.findOne({
    email: userEmail,
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

module.exports = {
  verifyToken,
};