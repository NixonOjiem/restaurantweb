const express = require("express");
// Create a new router object
const router = express.Router();

// Define your route on the router object.
// The path here is relative to where the router is mounted in server.js
router.get("/", (req, res) => {
  // The full path will be /restaurant + /
  res.send("Hello from the Restaurant Express server!");
});

// Export the router so it can be used in server.js
module.exports = router;
