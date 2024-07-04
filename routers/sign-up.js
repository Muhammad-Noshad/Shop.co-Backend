const express = require('express');

const upload = require("../middlewares/imageUploader");
const { handleUserSignUp } = require("../controllers/sign-up");

const router = express.Router();


router.post('/', upload.single('profilePic'), handleUserSignUp);

module.exports = router;