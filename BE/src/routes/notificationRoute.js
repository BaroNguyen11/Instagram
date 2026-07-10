const express = require("express");
const router = express.Router();

const {
  getAllNotifications,
  notificationIsRead,
  notificationUnRead,
  notificationReadAll,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");
router.use(protect);

router.get("/", getAllNotifications);
router.get("/unread-count", notificationUnRead);
router.patch("/:id/read", notificationIsRead);
router.patch("/read-all", notificationReadAll);

module.exports = router;
