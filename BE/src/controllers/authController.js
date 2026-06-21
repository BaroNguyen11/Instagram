const User = require('../models/User');
const generateToken = require('../utils/generateToken')


const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const exist = await User.findOne({ username });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.create({ username, password });

    res.json({ message: "Register success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user =  await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({ token });
};

const getUsers = async (req, res) => {
    try {
      const users = await User.find()
      return res.json(users)
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
}
const getProfile = (req, res) => {
  res.json({
    message: "Profile data",
    User: req.user
  });
};
module.exports = { register, login, getUsers,getProfile };