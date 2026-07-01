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
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: String,

    bio: String,
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);
