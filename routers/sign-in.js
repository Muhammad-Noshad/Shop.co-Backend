const express = require('express');

const { handleUserSignIn, handleGoogleSignIn } = require("../controllers/sign-in");

const router = express.Router();

router
  .post("/", handleUserSignIn)
  .post("/google", handleGoogleSignIn)

module.exports = router;