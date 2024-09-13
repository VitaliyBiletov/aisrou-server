const express = require('express')
const router = express.Router()

const wishesController = require('../controllers/wishesController')

router.get('/list', wishesController.list)
router.post('/create', wishesController.create)
router.delete('/remove/:id', wishesController.remove)


module.exports = router