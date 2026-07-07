const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { register, login, getProfile, logout, refreshToken,toggleFollow } = require('../controllers/authController');

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refreshToken)
router.post('/logout', logout)
router.get('/profile', protect, getProfile)
router.patch("/:id/follow", protect, toggleFollow);
module.exports = router