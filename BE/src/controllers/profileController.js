const Following = require("../models/Following");
const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const { username, fullName, gender, birthDate, website, bio } = req.body;
    const userId = req.user._id;

    if (website && !website.startsWith("http")) {
      return res.status(400).json({
        message: "Invalid website",
      });
    }
    const updateData = {};

    if (username?.trim()) updateData.username = username.trim();
    if (fullName?.trim()) updateData.fullName = fullName.trim();
    if (website?.trim()) updateData.website = website.trim();
    if (bio?.trim()) updateData.bio = bio.trim();

    // if (gender !== undefined) updateData.gender = gender;
    if (birthDate !== undefined) updateData.birthDate = birthDate;

    const updatedProfile = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-password -refreshToken",
    });
    if (!updatedProfile) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra, vui lòng thử lại!" });
  }
};

const getProfile = (req, res) => {
  return res.json({
    message: "Profile data",
    User: req.user,
  });
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
    const follow = await Following.findOne({
      follower: req.user._id,
      following: req.params.id,
    });
    return res.json({
      ...user.toObject(),
      isFollowing: !!follow,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { updateProfile, getProfile, getUserProfile };
