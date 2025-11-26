const express = require("express");
const {
  getMe,
  updateDetails,
  updatePassword,
  deleteUser,
} = require("../controllers/user.controller"); // Adjust path
const { protect } = require("../middleware/auth.middleware"); // Your authentication middleware

const router = express.Router();

// ALL routes below this line require a valid JWT token
router.use(protect);
router.get("/", (req, res) => {
  res.send("user route working");
});
router.get("/me", getMe);
router.put("/updatedetails", updateDetails);
router.put("/updatepassword", updatePassword);
router.delete("/delete", deleteUser); // Delete own account

module.exports = router;
