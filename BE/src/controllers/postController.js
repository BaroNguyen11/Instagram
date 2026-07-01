const Post = require("../models/Post");
require("../models/User");
const { getUsers } = require("./authController");
let posts = [];
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const createPost = async (req, res) => {
  try {
    const images = [];

    // Nếu có file được gửi lên từ multer
    if (req.files && req.files.length > 0) {
      // Chạy vòng lặp qua từng file để upload lên Cloudflare R2
      const uploadPromises = req.files.map(async (file) => {
        // Tạo tên file duy nhất để tránh trùng lặp trên R2
        const uniqueFilename = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}-${file.originalname}`;

        const uploadParams = {
          Bucket: process.env.R2_BUCKET_POST,
          Key: uniqueFilename, // Tên file lưu trên R2
          Body: file.buffer, // Dữ liệu binary của file từ RAM
          ContentType: file.mimetype, // Định dạng ảnh (image/jpeg, image/png...)
        };

        // Thực thi lệnh upload lên R2
        await s3Client.send(new PutObjectCommand(uploadParams));

        // Trả về URL public truy cập ảnh
        return {
          url: `${process.env.R2_PUBLIC_URL}/${uniqueFilename}`,
        };
      });

      // Đợi tất cả các file upload thành công
      const uploadedImages = await Promise.all(uploadPromises);
      images.push(...uploadedImages);
    }

    // Tạo post trong Database với các URL ảnh mới từ R2
    const post = await Post.create({
      author: req.user._id,
      caption: req.body.caption,
      images: images, // mảng chứa các { url: "https://..." }
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
