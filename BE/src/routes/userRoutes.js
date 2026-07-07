const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const { getUsers } = require("../controllers/authController");
const { uploadAvt } = require("../controllers/avatarController");

router.get("/", protect, getUsers);
router.post("/upload-avatar", protect, upload.single("avatar"), uploadAvt);

module.exports = router;
