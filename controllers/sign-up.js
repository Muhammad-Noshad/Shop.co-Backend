const User = require("../models/user");

async function handleUserSignUp(req, res){
  const { email, password } = req.body;

  const result = await User.create({
    email,
    password
  });

  return (result? res.json({status: "success"}): res.json({status: "failure"}));
}

module.exports = {
  handleUserSignUp,
}