const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRoleMiddleware')

const groupController = require('../controllers/groupController')

router.post('/attach', groupController.attach)
router.post('/unAttach', groupController.unAttach)
router.get('/getGroups', groupController.getGroups)
router.get('/all', groupController.getAll)
router.get('/users', groupController.getUsers)
router.get('/students/all', groupController.getStudents)

module.exports = router