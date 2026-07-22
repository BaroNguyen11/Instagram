const mongoose = require("mongoose");

const CommentLikeSchema = new mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

CommentLikeSchema.index({ comment: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("CommentLike", CommentLikeSchema);