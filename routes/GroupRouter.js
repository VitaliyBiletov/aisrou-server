const express = require('express')
const router = express.Router()
const checkRole = require('../middleware/checkRoleMiddleware')

const groupController = require('../controllers/groupController')

router.post('/attach', groupController.attach)
router.post('/unAttach', groupController.unAttach)
router.get('/getGroups', groupController.getGroups)

module.exports = router