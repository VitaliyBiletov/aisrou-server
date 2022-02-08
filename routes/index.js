const express = require('express')
const router = express.Router()
const userRouter = require('./UserRouter')
const studentRouter = require('./StudentRouter')
const diagnosticRouter = require('./DiagnosticRouter')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.use('/user', userRouter)
router.use('/student', checkRole("ADMIN"), studentRouter)
router.use('/diagnostic',authMiddleware, diagnosticRouter)

module.exports = router