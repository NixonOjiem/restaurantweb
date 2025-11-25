const jwt = require("jsonwebtoken");
const ErrorResponse = require("../config/errorHandler");

exports.protect = async (req, res, next) => {
  console.log("Protect middleware called");
  console.log("Authorization header:", req.headers.authorization);
  let token;

  // 1. Token extraction logic remains the same (Auth Header or Cookie)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route. Token missing.",
    });
  }

  try {
    // 2. Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // --- THE OPTIMIZATION: SKIP DB QUERY ---

    // 3. Attach the decoded payload (which contains the user ID) to the request object.
    // The payload usually looks like: { id: 'userID_ABC', iat: 12345, exp: 67890 }
    req.user = decoded;
    console.log("Token verified, proceeding to route");

    // Optionally, if you included other basic data in the token (e.g., role, userName),
    // you can attach the full decoded object or specific properties.

    // 4. Proceed to the next middleware or the route handler
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route. Token invalid.",
    });
  }
};
