const express = require('express');

const { handleUserSignIn } = require("../controllers/sign-in");

const router = express.Router();

router.post("/", handleUserSignIn);

module.exports = router;