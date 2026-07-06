const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username},
    process.env.JWT_SECRET || "access_secret_123",
    { expiresIn: "15s" },
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id },
    process.env.JWT_REFRESH_SECRET || "refresh_secret_456",
    { expiresIn: "7d" },
  );
};
module.exports = { generateAccessToken, generateRefreshToken };
