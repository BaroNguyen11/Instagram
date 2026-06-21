const Post = require("../models/Post");
require("../models/User");
const { getUsers } = require("./authController");
let posts = [];
const createPost = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => ({
      url: `http://localhost:${process.env.PORT || 8080}/uploads/${file.filename}`,
    })) : [];

    const post = await Post.create({
      author: req.user._id,
      caption: req.body.caption,
      images: images,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getPostById = (req, res) => {
  const id = parseInt(req.params.id);

  const postById = posts.findIndex((p) => p.id === id);
  if (postById === -1) {
    return res.status(404).json({ message: "post not found" });
  }
  return res.json(posts[postById]);
};
const updatePost = (req, res) => {
  const id = parseInt(req.params.id);

  const postById = posts.findIndex((p) => p.id === id);
  if (postById === -1) {
    return res.status(404).json({ message: "post not found" });
  }
  if (posts[postById].author !== req.user.username) {
    return res
      .status(403)
      .json({ message: "you are not the author of this post" });
  }
  posts[postById].title = req.body.title || posts[postById].title;
  posts[postById].content = req.body.content || posts[postById].content;
  return res.json(posts[postById]);
};
const deletePost = (req, res) => {
  const id = parseInt(req.params.id);

  const postById = posts.findIndex((p) => p.id === id);
  if (postById === -1) {
    return res.status(404).json({ message: "post not found" });
  }
  const deletePost = posts[postById];
  posts.splice(postById, 1);
  return res.json({
    message: "delete successful",
    data: deletePost,
  });
};
module.exports = {
  posts,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
