const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRoleMiddleware')

const diagnosticController = require('../controllers/diagnosticController')

router.get('/get', diagnosticController.getDiagnostics)
router.post('/create', diagnosticController.create)
router.post('/remove', diagnosticController.remove)

module.exports = router