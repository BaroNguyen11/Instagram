const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const {updateProfile,getProfile} = require('../controllers/profileController')


router.patch('/', protect,updateProfile)
router.get('/', protect,getProfile)


module.exports = router