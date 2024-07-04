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

  // const result = await User.findOne({ email: userEmail });
8
  // if(!result)
  //   res.status(401).json({ status: "failure" });

  return res.json({ isAuthenticated: true });
}

module.exports = {
  verifyToken,
};