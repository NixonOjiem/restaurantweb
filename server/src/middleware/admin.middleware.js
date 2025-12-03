exports.admin = (req, res, next) => {
  // 1. Check if the 'protect' middleware successfully attached the user
  if (!req.user) {
    return res.status(500).json({
      success: false,
      error: "Server Error: Authorization check failed (User not loaded).",
    });
  }

  // 2. Check if the role in the decoded payload is 'admin'
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Admin resources only.",
    });
  }

  // 3. User is admin, proceed
  console.log("Admin privilege verified");
  next();
};
