const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleUserSignIn(req, res){
  const { email, password } = req.body;

  const user = await User.findOne({
    email
  });

  if(!user)
    return res.json({status: "failure"});

  const passwordMatch = await bcrypt.compare(password, user.password);

  if(passwordMatch){
    const accessToken = jwt.sign({
      _id: user._id,
      "email": user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    });
    
    res.status(202).cookie("accessToken", accessToken, {
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    });

    return res.json({status: "success"});
  }
  else{
    return res.json({status: "failure"});
  }
}

module.exports = {
  handleUserSignIn,
}