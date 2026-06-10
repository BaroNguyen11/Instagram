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
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: String,

    bio: String,
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);