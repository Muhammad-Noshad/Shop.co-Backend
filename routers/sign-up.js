const express = require('express');

const { handleUserSignUp } = require("../controllers/sign-up");

const router = express.Router();

router.post("/", handleUserSignUp);

module.exports = router;