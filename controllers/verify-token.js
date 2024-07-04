const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

async function verifyToken(req, res){
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.json({ success: false });
  }

  let userEmail;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if(error)
      res.json({ success: false });
      userEmail = decoded.email;
  }); 

  // const result = await User.findOne({ email: userEmail });
8
  // if(!result)
  //   res.status(401).json({ status: "failure" });

  return res.json({ success: true, user:{ email: userEmail } });
}

module.exports = {
  verifyToken,
};