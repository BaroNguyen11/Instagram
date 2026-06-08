const express = require('express')
const router = express.Router()

const {getUsers} = require('../controllers/authController')

router.get('/',getUsers)

module.exports = router