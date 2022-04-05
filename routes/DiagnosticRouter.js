const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRoleMiddleware')

const diagnosticController = require('../controllers/diagnosticController')

router.get('/get', diagnosticController.getDiagnostics)
router.post('/create', diagnosticController.create)
router.get('/types', diagnosticController.getTypes)
router.delete('/:id', diagnosticController.remove)
router.post('/save/', diagnosticController.save)
router.get('/:id', diagnosticController.get)

module.exports = router