const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { createStory, getStory } = require("../controllers/storyController");
const upload = require("../middleware/upload");

router.post("/", protect, upload.array("files", 10), createStory);
router.get("/", protect, getStory);

module.exports = router;
