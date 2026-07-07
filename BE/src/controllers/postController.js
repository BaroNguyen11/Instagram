const Post = require("../models/Post");
const PostLike = require("../models/PostLike");
require("../models/User");
const Saved = require("../models/Saved");
const { getUsers } = require("./authController");
let posts = [];
const r2Service = require("../services/r2.service");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    // 4. Giới hạn số ảnh: Instagram tối đa 10 ảnh
    if (req.files && req.files.length > 10) {
      return res
        .status(400)
        .json({ message: "Too many images. Maximum allowed is 10." });
    }

    const images = [];

    // Nếu có file được gửi lên từ multer
    if (req.files && req.files.length > 0) {
      // Chạy vòng lặp qua từng file để upload lên Cloudflare R2 sử dụng service
      const uploadPromises = req.files.map((file) =>
        r2Service.uploadToR2(
          file,
          process.env.R2_BUCKET_POST,
          process.env.R2_PUBLIC_URL,
        ),
      );

      // Đợi tất cả các file upload thành công
      const uploadedImages = await Promise.all(uploadPromises);
      images.push(...uploadedImages);
    }

    // Tạo post trong Database với các URL ảnh mới từ R2
    const post = await Post.create({
      author: req.user._id,
      caption: req.body.caption,
      images: images,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { postsCount: 1 },
    });

    return res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const likes = await PostLike.find({
      user: req.user._id,
      post: {
        $in: posts.map((p) => p._id),
      },
    });
    const likedIds = new Set(likes.map((l) => l.post.toString()));

    const savedPosts = await Saved.find({
      user: req.user._id,
      post: {
        $in: posts.map((p) => p._id),
      },
    });

    const savedIds = new Set(savedPosts.map((s) => s.post.toString()));

    const result = posts.map((post) => ({
      ...post.toObject(),
      liked: likedIds.has(post._id.toString()),
      saved: savedIds.has(post._id.toString()),
    }));

    return res.json({
      posts: result,
      pagination: {
        page,
        limit,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        hasNextPage: page * limit < totalPosts,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({
      author: req.params.id,
    });

    const posts = await Post.find({
      author: req.params.id,
    })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const likes = await PostLike.find({
      user: req.user._id,
      post: { $in: posts.map((p) => p._id) },
    });

    const likedIds = new Set(likes.map((l) => l.post.toString()));

    const savedPosts = await Saved.find({
      user: req.user._id,
      post: { $in: posts.map((p) => p._id) },
    });

    const savedIds = new Set(savedPosts.map((s) => s.post.toString()));

    const result = posts.map((post) => ({
      ...post.toObject(),
      liked: likedIds.has(post._id.toString()),
      saved: savedIds.has(post._id.toString()),
    }));

    return res.json({
      posts: result,
      pagination: {
        page,
        limit,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        hasNextPage: page * limit < totalPosts,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username avatar",
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const liked = await PostLike.findOne({
      post: post._id,
      user: req.user._id,
    });
    const saved = await Saved.findOne({
      post: post._id,
      user: req.user._id,
    });

    return res.json({
      ...post.toObject(),
      liked: !!liked,
      saved: !!saved,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not the author of this post" });
    }
    post.caption = req.body.caption || post.caption;
    await post.save();
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    // Tìm post trước khi xóa để lấy danh sách ảnh cần xóa trên R2
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Xóa các file ảnh tương ứng trên Cloudflare R2
    if (post.images && post.images.length > 0) {
      try {
        const deletePromises = post.images.map((img) =>
          r2Service.deleteFromR2(img.url, process.env.R2_BUCKET_POST),
        );
        await Promise.all(deletePromises);
      } catch (r2Error) {
        console.error("Failed to delete some images from R2:", r2Error);
      }
    }

    // Xóa post khỏi database
    await post.deleteOne();
    await User.findByIdAndUpdate(post.author, {
      $inc: {
        postsCount: -1,
      },
    });
    return res.status(200).json({
      message: "Delete successful",
      data: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "username avatar",
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const liked = await PostLike.findOne({
    post: post._id,
    user: req.user._id,
  });

  const saved = await Saved.findOne({
    post: post._id,
    user: req.user._id,
  });

  if (liked) {
    await liked.deleteOne();
    post.likeCount--;
    await post.save();

    return res.json({
      ...post.toObject(),
      liked: false,
      saved: !!saved,
    });
  }

  await PostLike.create({
    post: post._id,
    user: req.user._id,
  });

  post.likeCount++;
  await post.save();

  return res.json({
    ...post.toObject(),
    liked: true,
    saved: !!saved,
  });
};

const savePosts = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "username avatar",
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const liked = await PostLike.findOne({
    post: post._id,
    user: req.user._id,
  });

  const saved = await Saved.findOne({
    post: post._id,
    user: req.user._id,
  });

  if (saved) {
    await saved.deleteOne();

    return res.json({
      ...post.toObject(),
      liked: !!liked,
      saved: false,
    });
  }

  await Saved.create({
    post: post._id,
    user: req.user._id,
  });

  return res.json({
    ...post.toObject(),
    liked: !!liked,
    saved: true,
  });
};
module.exports = {
  posts,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  savePosts,
  getPostsByUser,
};
