const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { createComment, getComment, deleteComment, getCommentsByPost } = require('../controllers/commentController')
router.use(protect)

router.post('/posts/:id', createComment)
router.get('/posts/:id', getCommentsByPost)
router.get('/:id', getComment)
router.delete('/:id', deleteComment)

module.exports = router