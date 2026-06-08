const { posts } = require('./postController')

let comments = []

const createComment = (req, res) => {
    const postId = parseInt(req.params.id)
    const post = posts.find(p => p.id === postId)

    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }

    const newComment = {
        id: Date.now(),
        postId: postId,
        content: req.body.content,
        author: req.user.username,
        createdAt: new Date()
    }
    comments.push(newComment)
    res.json(newComment)
}

const getComment = (req, res) => {
    const id = parseInt(req.params.id)

    const commentId = comments.findIndex(c => c.id === id)
    if (commentId === -1) {
        return res.status(404).json({ message: "Comment not found" })
    }
    res.json(comments[commentId])
}

const deleteComment = (req, res) => {
    const id = parseInt(req.params.id)

    const commentIndex = comments.findIndex(c => c.id === id)
    if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" })
    }
    if (comments[commentIndex].author !== req.user.username) {
        return res.status(403).json({ message: "you are not the author" })
    }
    const deletedComment = comments[commentIndex]
    comments.splice(commentIndex, 1)
    return res.json({
        message: "delete comment successful",
        data: deletedComment
    })
}
const getCommentsByPost = (req, res) => {
    const postId = parseInt(req.params.id)

    const result = comments.filter(c => c.postId === postId)
    res.json(result)
}
module.exports = { createComment, getComment, deleteComment, getCommentsByPost }