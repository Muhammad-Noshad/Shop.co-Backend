const express = require('express');

const { verifyToken } = require("../controllers/verify-token");

const router = express.Router();

router.get("/", verifyToken);

module.exports = router;