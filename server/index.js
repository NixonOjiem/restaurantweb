// 1. Import the Express module
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db.config");
const errorHandler = require("./src/config/errorHandler");
const mainRouter = require("./src/routes/index");

// --- CORS Configuration ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5174",
  "https://restaurantprod.netlify.app",
];
const corsOptions = {
  // 1. Define allowed origins
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin is in the allowed list
    } else {
      callback(new Error("Not allowed by CORS"), false); // Origin is denied
    }
  },
  // 2. Define allowed HTTP methods
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // 3. Allow credentials (important for cookies/JWTs in cookies)
  credentials: true,
  // 4. Define allowed headers
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();
const PORT = 3000;
app.use(cookieParser());
// Apply the specific CORS configuration globally
app.use(cors(corsOptions));

//2. connect to mongo DB
connectDB();

//3. middleware to parse JSON
app.use(express.json());

//4. Test server route
app.get("/", (req, res) => {
  res.send("Hello from the restaurant main express server!");
});

app.get("/restaurant", (req, res) => {
  res.send("Hello from the restaurant main express server!");
});

// 5.Test Api ROUTE  prefixed with /restaurant
app.use("/restaurant/v1/", mainRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop the server.");
});
