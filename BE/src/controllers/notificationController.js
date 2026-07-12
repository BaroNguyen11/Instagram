const Following = require("../models/Following");
const Notification = require("../models/Notification");

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user._id,
    })
      .populate("sender", "username avatar")
      .populate("post", "images")
      .sort({ createdAt: -1 });

    const follows = await Following.find({
      follower: req.user._id,
    }).select("following");

    const followingIds = new Set(follows.map((f) => f.following.toString()));

    const result = notifications.map((noti) => ({
      ...noti.toObject(),
      isFollowing: followingIds.has(noti.sender._id.toString()),
    }));

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
const notificationIsRead = async (req, res) => {
  try {
    const read = await Notification.findByIdAndUpdate(
      {
        _id: req.params.id,
        receiver: req.user._id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      },
    );
    return res.json(read);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
const notificationReadAll = async (req, res) => {
  try {
    const read = await Notification.updateMany(
      {
        receiver: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      },
    );
    return res.json(read);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
const notificationUnRead = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      receiver: req.user._id,
      isRead: false,
    });

    return res.json(count);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
module.exports = {
  getAllNotifications,
  notificationIsRead,
  notificationUnRead,
  notificationReadAll,
};
