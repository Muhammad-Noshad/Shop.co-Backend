const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleUserSignIn(req, res){
  const { email, password } = req.body;

  let user = await User.findOne({
    email
  });

  if(!user)
    return res.json({success: false, message: "No such Email found!"});

  const passwordMatch = await bcrypt.compare(password, user.password);

  if(passwordMatch){
    const accessToken = jwt.sign({
      _id: user._id,
      "email": user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    res.cookie("accessToken", accessToken, {
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    });

    return res.json({success: true});
  }
  else{
    return res.json({success: false, message: "Invalid password!"});
  }
}

module.exports = {
  handleUserSignIn,
}