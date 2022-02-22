const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRoleMiddleware')

const groupController = require('../controllers/groupController')

router.post('/attach', groupController.attach)
router.get('/all', groupController.getAll)
router.get('/users', groupController.getUsers)
router.get('/students/all', groupController.getStudents)
router.get('/students', groupController.getStudentsForUser)

module.exports = router