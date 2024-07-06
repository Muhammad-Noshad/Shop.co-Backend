const express = require('express');

const upload = require("../middlewares/imageUploader");
const { handleUserSignIn, handleGoogleSignIn, handleUserSignUp } = require("../controllers/user");

const router = express.Router();

router
  .post("/sign-in", handleUserSignIn)
  .post("/sign-in/google", handleGoogleSignIn)
  .post("/sign-up", upload.single('profilePic'), handleUserSignUp);

module.exports = router;