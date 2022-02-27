const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

const userController = require('../controllers/userController')

router.post('/registration', checkRole("ADMIN"), userController.registration)
router.post('/login', userController.login)
router.post('/auth', authMiddleware, userController.check)
router.get('/all', checkRole("ADMIN"), userController.getAll)
router.get('/:id', checkRole("ADMIN"), userController.get)
router.post('/edit/:id', checkRole("ADMIN"), userController.edit)
router.post('/password-set/:id', checkRole("ADMIN"), userController.setPassword)
router.delete('/remove/:id', checkRole("ADMIN"), userController.remove)

module.exports = router