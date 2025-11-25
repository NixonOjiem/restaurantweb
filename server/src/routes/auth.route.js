const express = require("express");
const {
  signup,
  signin,
  googleAuth,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleauth", googleAuth);

// Google Authentication Route (will involve a GET redirect and a POST/GET callback)

module.exports = router;
