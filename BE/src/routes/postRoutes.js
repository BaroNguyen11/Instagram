const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController')
router.post('/', protect, createPost)
router.get('/', getAllPosts)

router.use(protect)

router.get('/:id', getPostById)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
module.exports = router