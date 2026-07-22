const Following = require("../models/Following");
const Story = require("../models/Story");
const r2Service = require("../services/r2.service");

const createStory = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    const uploadPromises = req.files.map((file) =>
      r2Service.uploadToR2(
        file,
        process.env.R2_BUCKET_STR,
        process.env.R2_PUBLIC_URL_STORY
      )
    );

    const uploadedMedia = await Promise.all(uploadPromises);

    const stories = await Story.insertMany(
      uploadedMedia.map((media) => ({
        user: req.user._id,
        media,
        content: req.body.content || "",
        duration: req.body.duration || 15,
      }))
    );

    return res.status(201).json(stories);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getStory = async (req, res) => {
  try {
    const following = await Following.find({
      follower: req.user._id,
    }).select("following");
    const followingIds = following.map((item) => item.following);

    followingIds.unshift(req.user._id);

    const stories = await Story.find({
      user: { $in: followingIds },
      createdAt: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    })
      .populate("user", "username fullName avatar")
      .sort({
        createdAt: -1,
      });
    const groupedStories = {};

    stories.forEach((story) => {
      const id = story.user._id.toString();

      if (!groupedStories[id]) {
        groupedStories[id] = {
          user: story.user,
          stories: [],
        };
      }

      groupedStories[id].stories.push(story);
    });

    return res.json(Object.values(groupedStories));
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  createStory,
  getStory,
};
