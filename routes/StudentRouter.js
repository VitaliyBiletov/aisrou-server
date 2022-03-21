const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const studentController = require('../controllers/studentController')

router.post('/registration', authMiddleware, studentController.registration)
router.get('/all', authMiddleware, studentController.getAll)
router.get('/list', authMiddleware, studentController.getList)
router.get('/:id', authMiddleware, studentController.get)
router.post('/edit/:id', checkRole('ADMIN'), studentController.edit)
router.delete('/remove/:id', checkRole('ADMIN'), studentController.remove)

module.exports = router