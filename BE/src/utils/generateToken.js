const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username, fullname: user.fullName },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1d" },
  );
};
module.exports = generateToken;
