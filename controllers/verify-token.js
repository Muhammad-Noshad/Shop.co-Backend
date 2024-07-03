const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

async function verifyToken(req, res){
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ status: "failure" });
  }

  // let userEmail;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if(error)
      res.status(400).json({ status: "failure" });
      //userEmail = decoded.email;
  }); 

  // const result = await User.findOne({ email: userEmail });
8
  // if(!result)
  //   res.status(401).json({ status: "failure" });

  res.json({ status: "success" });
}

module.exports = {
  verifyToken,
};