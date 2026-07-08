const Following = require("../models/Following");

const getFollowers = async (req, res) => {
  try {
    const followers = await Following.find({
      following: req.params.id,
    }).populate("follower", "username fullName avatar bio");

    return res.json(followers.map((item) => item.follower));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const following = await Following.find({
      follower: req.params.id,
    }).populate("following", "username fullName avatar bio");
    console.log(following);
    return res.json(following.map((item) => item.following));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { getFollowers, getFollowing };
