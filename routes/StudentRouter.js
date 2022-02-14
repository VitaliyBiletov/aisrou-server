const express = require('express')
const router = express.Router()

const studentController = require('../controllers/studentController')

router.post('/registration', studentController.registration)
router.get('/all', studentController.getAll)
router.post('/edit/:id', studentController.edit)
router.get('/:id', studentController.check)
router.delete('/remove/:id', studentController.remove)

module.exports = router