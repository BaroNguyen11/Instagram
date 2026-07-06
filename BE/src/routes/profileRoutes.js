const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const {updateProfile} = require('../controllers/profileController')


router.patch('/', protect,updateProfile)

module.exports = router