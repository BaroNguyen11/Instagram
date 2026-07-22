const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    media: {
      url: {
        type: String,
        required: true,
      },
      width: Number,
      height: Number,
      type: {
        type: String,
        enum: ["image", "video"],
        default: "image",
      },
    },

    content: {
      type: String,
      default: "",
    },

    likeCount: {
      type: Number,
      default: 0,
    },

    viewCount: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 15,
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
      expires: 0,
    },
  },
  {
    timestamps: true,
  },
);
storySchema.index({ user: 1, createdAt: -1 });
module.exports = mongoose.model("Story", storySchema);
