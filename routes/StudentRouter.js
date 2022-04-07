const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

const studentController = require('../controllers/studentController')

router.put('/', studentController.registration) //authMiddleware
router.get('/', authMiddleware, studentController.getAll)
router.get('/list', authMiddleware, studentController.getList)
router.get('/:id', authMiddleware, studentController.get)
router.put('/:id', checkRole('ADMIN'), studentController.edit)
router.delete('/:id', checkRole('ADMIN'), studentController.remove)

module.exports = router