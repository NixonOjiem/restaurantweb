// routes/index.js

const express = require("express");
const mainRouter = express.Router();

// 1. Import the separate route files
const authRoutes = require("./auth.route");
const testRoutes = require("./test.route");

// 2. Mount the routers onto the mainRouter with specific prefixes

// Mount the test/index routes at the root (/)
// The path for the test route will be: /api/v1/
mainRouter.use("/", testRoutes);

// Mount the authentication routes under the '/auth' path
// The paths will be: /api/v1/auth/signup, /api/v1/auth/signin, etc.
mainRouter.use("/auth", authRoutes);

module.exports = mainRouter;
