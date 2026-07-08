const Follow = require("../models/Following");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const exist = await User.findOne({ username });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({ username, password: hashedPassword });

    return res.status(201).json({ message: "Register success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Missing refresh token" });
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    user.refreshToken = null;
    await user.save();
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Missing refresh token" });
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "refresh_secret_456",
    );
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const accessToken = generateAccessToken(user);
    return res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password -refreshToken");
    const follows = await Follow.find({
      follower: req.user._id,
    });
    const followingIds = new Set(follows.map((f) => f.following.toString()));
    const result = users.map((user) => ({
      ...user.toObject(),
      isFollowing: followingIds.has(user._id.toString()),
    }));

    return res.json(result);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const toggleFollow = async (req, res) => {
  try {
    const targetUserId = req.params.id;

    // Không cho phép follow chính mình
    if (req.user._id.toString() === targetUserId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const follow = await Follow.findOne({
      follower: req.user._id,
      following: targetUserId,
    });

    if (follow) {
      // Unfollow
      await follow.deleteOne();

      await User.findByIdAndUpdate(req.user._id, {
        $inc: { followingCount: -1 },
      });

      await User.findByIdAndUpdate(targetUserId, {
        $inc: { followersCount: -1 },
      });

      return res.json({
        following: false,
      });
    }

    // Follow
    await Follow.create({
      follower: req.user._id,
      following: targetUserId,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { followingCount: 1 },
    });

    await User.findByIdAndUpdate(targetUserId, {
      $inc: { followersCount: 1 },
    });

    return res.json({
      following: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = (req, res) => {
  return res.json({
    message: "Profile data",
    User: req.user,
  });
};
module.exports = {
  register,
  login,
  getUsers,
  getProfile,
  logout,
  refreshToken,
  toggleFollow,
};
