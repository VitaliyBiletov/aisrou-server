const express = require('express')
const router = express.Router()
const userRouter = require('./UserRouter')
const studentRouter = require('./StudentRouter')
const diagnosticRouter = require('./DiagnosticRouter')
const groupRouter = require('./GroupRouter')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.use('/users', userRouter)
router.use('/students', studentRouter) //checkRole("ADMIN")
router.use('/groups', groupRouter)
// router.use('/diagnostic',authMiddleware, diagnosticRouter)
router.use('/diagnostics', diagnosticRouter)

module.exports = router