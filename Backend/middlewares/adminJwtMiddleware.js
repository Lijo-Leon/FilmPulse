const jwt = require("jsonwebtoken");

const adminJwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.jwtKey);

    if (decoded.role !== "FilmPulseAdmin") {
      return res.status(403).json({
        message: "Access denied. Admins only"
      });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error
    });
  }
};

module.exports = adminJwtMiddleware;
