const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { createComment, updateComment, deleteComment, getCommentsByPost } = require('../controllers/commentController')
router.use(protect)

router.post('/posts/:id', createComment)
router.get('/posts/:postId', getCommentsByPost)
router.patch('/:id', updateComment)
router.delete('/:id', deleteComment)

module.exports = router