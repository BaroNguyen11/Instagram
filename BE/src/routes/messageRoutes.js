const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { getMessages,readMessages } = require('../controllers/messageController')

router.use(protect)

router.get("/:userId",getMessages)
router.patch("/read/:userId",readMessages)

module.exports = router