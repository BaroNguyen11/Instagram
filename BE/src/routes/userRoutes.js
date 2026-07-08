const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const { getUsers } = require("../controllers/authController");
const { uploadAvt } = require("../controllers/avatarController");
const { getFollowers, getFollowing } = require("../controllers/followController");
const { getUserProfile } = require("../controllers/profileController");

router.get("/", protect, getUsers);
router.get("/:id", protect, getUserProfile);
router.get("/follower/:id", getFollowers);
router.get("/following/:id", getFollowing);
router.post("/upload-avatar", protect, upload.single("avatar"), uploadAvt);

module.exports = router;
