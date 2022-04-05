const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

const userController = require('../controllers/userController')

router.put('/', userController.registration) //checkRole("ADMIN")
router.get('/list', checkRole("ADMIN"), userController.getList)
router.get('/', checkRole("ADMIN"), userController.getUsers)
router.get('/:id', checkRole("ADMIN"), userController.getUser)
router.put('/:id', checkRole("ADMIN"), userController.edit)
router.post('/password', checkRole("ADMIN"), userController.setPassword)
router.delete('/:id', checkRole("ADMIN"), userController.remove)

router.post('/login', userController.login)
router.post('/auth', authMiddleware, userController.check)


module.exports = router