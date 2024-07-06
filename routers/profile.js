const express = require('express');

const upload = require("../middlewares/imageUploader");
const { editProfileInfo, editAccountInfo, editProfilePic } = require("../controllers/profile")

const router = express.Router();

router
  .patch("/edit/personal-info", editProfileInfo)
  .patch("/edit/account-info", editAccountInfo)
  .patch("/edit/profile-pic", upload.single('profilePic'), editProfilePic);

module.exports = router;