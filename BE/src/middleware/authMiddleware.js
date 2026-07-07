const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ message: "No token" });
  }
  const token = authHeaders.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "access_secret_123");
    const user = await User.findById(decoded._id).select("-password -refreshToken");

if (!user) {
  return res.status(401).json({
    message: "User not found",
  });
}

req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };