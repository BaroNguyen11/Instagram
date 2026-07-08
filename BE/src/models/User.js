const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: String,

    email: {
      type: String,
        required: false,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "https://avatarhub.edu.vn/wp-content/uploads/2025/12/avatar-mac-dinh-cua-fb-4.jpg"
    },

    bio: String,
    refreshToken: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },

    birthDate: {
      type: Date,
      default: null,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },

    followersCount: {
      type: Number,
      default: 0,
    },

    followingCount: {
      type: Number,
      default: 0,
    },

    postsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);
