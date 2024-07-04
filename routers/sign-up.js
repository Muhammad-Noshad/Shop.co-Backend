const express = require('express');

const { handleUserSignUp } = require("../controllers/sign-up");

const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('profilePic'), handleUserSignUp);

module.exports = router;