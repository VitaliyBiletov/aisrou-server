const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRoleMiddleware')

const diagnosticController = require('../controllers/diagnosticController')

// router.get('/', diagnosticController.load)

module.exports = router