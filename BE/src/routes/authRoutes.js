const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { register, login, getProfile, logout, refreshToken } = require('../controllers/authController');

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refreshToken)
router.post('/logout', logout)
router.get('/profile', protect, getProfile)
module.exports = router