// 1. Import the Express module
require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db.config");
// Import the router you exported from test.route.js
const testUrl = require("./src/routes/test.route");

const app = express();
const PORT = 3000;

//2. connect to mongo DB
connectDB();

//3. middleware to parse JSON
app.use(express.json());

//4. Test server route
app.get("/", (req, res) => {
  res.send("Hello from the restaurant main express server!");
});

// 5.Test Api ROUTE  prefixed with /restaurant
app.use("/restaurant", testUrl);

// 6. Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop the server.");
});
