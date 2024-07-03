const User = require("../models/user");
const bcrypt = require("bcrypt");

async function handleUserSignUp(req, res){
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    email: email,
    password: hashedPassword
  });

  return (result? res.json({status: "success"}): res.json({status: "failure"}));
}

module.exports = {
  handleUserSignUp,
}