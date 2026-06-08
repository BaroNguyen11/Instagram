const generateToken = require('../utils/generateToken')

let users = [];

const register = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const exist = users.find(u => u.username === username);

  if (exist) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });

  res.json({ message: "Register success" });
};

const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({ token });
};

const getUsers = (req, res) => {
  return res.json(users)
}
const getProfile = (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user
  });
};
module.exports = { register, login, getUsers,getProfile };