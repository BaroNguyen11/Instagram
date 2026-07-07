const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  savePosts,
  getPostsByUser
} = require("../controllers/postController");
const upload = require("../middleware/upload");


router.post("/", protect, upload.array("images", 10), createPost);

router.use(protect);
router.get("/", getAllPosts);
router.get("/user/:id", getPostsByUser);

router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/liked", toggleLike);
router.patch("/:id/saved", savePosts);
module.exports = router;
