const User = require("../models/user");

async function handleUserSignIn(req, res){
  const { email, password } = req.body;

  const result = await User.findOne({
    email,
    password
  });

  return (result? res.json({status: "success"}): res.json({status: "failure"}));
}

module.exports = {
  handleUserSignIn,
}