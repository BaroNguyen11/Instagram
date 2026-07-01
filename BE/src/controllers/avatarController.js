const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const User = require("../models/User");

const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const uploadAvt = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.file;
        const uniqueFilename = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}-${file.originalname}`;

        const uploadParams = {
            Bucket: process.env.R2_BUCKET_AVT,
            Key: uniqueFilename, // Tên file lưu trên R2
            Body: file.buffer, // Dữ liệu binary của file từ RAM
            ContentType: file.mimetype, // Định dạng ảnh (image/jpeg, image/png...)
        };

        // Thực thi lệnh upload lên R2
        await s3Client.send(new PutObjectCommand(uploadParams));

        const avatarUrl = `${process.env.R2_PUBLIC_URL_AVATAR}/${uniqueFilename}`;

        // Cập nhật avatar của user trong Database
        const updateAvatar = await User.updateOne(
            { _id: req.user._id },
            { avatar: avatarUrl }
        );

        if (updateAvatar.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "Avatar updated successfully", 
            avatar: avatarUrl 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { uploadAvt }