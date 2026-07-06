const Comment = require("../models/Comment");
const CommentLike = require("../models/CommentLike");

const Post = require("../models/Post");
const User = require("../models/User");

const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    console.log(postId)
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      post: postId,
      user: req.user._id,
      content: req.body.content,
    });

    // Cập nhật số lượng comment trên bài viết
    post.commentCount = (post.commentCount || 0) + 1;
    await post.save();

    await comment.populate("user", "username avatar");
    return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId).populate(
      "user",
      "username avatar",
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const liked = await CommentLike.findOne({
      comment: commentId,
      user: req.user._id,
    });

    let isLiked;

    if (liked) {
      await liked.deleteOne();

      comment.likeCounts = Math.max(0, comment.likeCounts - 1);

      isLiked = false;
    } else {
      await CommentLike.create({
        comment: commentId,
        user: req.user._id,
      });

      comment.likeCounts++;

      isLiked = true;
    }

    await comment.save();

    return res.json({
      ...comment.toObject(),
      liked: isLiked,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);

    // Giảm số lượng comment trên bài viết
    const post = await Post.findById(comment.post);
    if (post) {
      post.commentCount = Math.max(0, (post.commentCount || 0) - 1);
      await post.save();
    }

    return res.json({
      message: "Delete comment successful",
      data: comment,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username avatar")
      .sort({ createdAt: 1 });

    // lấy tất cả comment mà user hiện tại đã like
    const likes = await CommentLike.find({
      user: req.user._id,
      comment: {
        $in: comments.map((c) => c._id),
      },
    });
    // chuyển sang Set để tìm kiếm O(1)
    const likedIds = new Set(likes.map((like) => like.comment.toString()));

    return res.json(
      comments.map((c) => ({
        ...c.toObject(),
        liked: likedIds.has(c._id.toString()),
      })),
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
};
