const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const groupController = require('../controllers/groupController')

router.post('/attach',checkRole('ADMIN'), groupController.attach)
router.get('/:id', authMiddleware, groupController.getGroup)
router.delete('/remove/:id', authMiddleware, groupController.remove)

module.exports = router