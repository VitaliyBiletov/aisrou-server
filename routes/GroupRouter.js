const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const groupController = require('../controllers/groupController')

router.post('/list', authMiddleware, groupController.getGroupsList)
router.put('/', checkRole('ADMIN'), groupController.attach)
router.get('/test', groupController.test)
router.get('/:id', authMiddleware, groupController.getGroup)
router.delete('/:id', authMiddleware, groupController.remove)


module.exports = router