// 1. Import the Express module
const express = require("express");
// Import the router you exported from test.route.js
const testUrl = require("./src/routes/test.route");
const app = express();

const PORT = 3000;

// 4. Mount the testUrl router at the '/restaurant' path.
// All routes defined in test.route.js will be prefixed with '/restaurant'
app.get("/", (req, res) => {
  res.send("Hello from the restaurant main express server!");
});
app.use("/restaurant", testUrl);

// 5. Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop the server.");
});
