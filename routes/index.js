const express = require('express')
const router = express.Router()
const userRouter = require('./UserRouter')
const studentRouter = require('./StudentRouter')

router.use('/user', userRouter)
router.use('/student', studentRouter)

module.exports = router