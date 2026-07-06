const User = require("../models/User");
const r2Service = require("../services/r2.service");

const uploadAvt = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete old avatar from R2 if it exists and is stored on R2
        if (user.avatar && user.avatar.includes(process.env.R2_PUBLIC_URL_AVATAR)) {
            try {
                await r2Service.deleteFromR2(user.avatar, process.env.R2_BUCKET_AVT);
            } catch (r2Error) {
                console.error("Failed to delete old avatar from R2:", r2Error);
            }
        }

        // Upload new avatar using the service
        const uploadResult = await r2Service.uploadToR2(
            req.file,
            process.env.R2_BUCKET_AVT,
            process.env.R2_PUBLIC_URL_AVATAR
        );

        const avatarUrl = uploadResult.url;

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