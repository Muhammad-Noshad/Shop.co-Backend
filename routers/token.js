const express = require('express');

const { verifyToken, deleteToken } = require("../controllers/token");

const router = express.Router();

router
  .get("/verify", verifyToken)
  .delete("/delete", deleteToken);

module.exports = router;