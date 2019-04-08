const router = require('express').Router()
const userController = require('../controllers/usersController')

router.get('/', userController.findAll)
router.get('/:id', userController.findOne)
router.post('/register', userController.register)
router.post('/sign-in', userController.webLogin)
router.post('/google-sign-in', userController.googleLogin)

module.exports  = router