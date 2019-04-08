const router = require('express').Router()
const todoController = require('../controllers/todoControllers')
const {authentication} = require('../middlewares/authentication')

router.use(authentication)
router.get('/:id', todoController.findAll)
router.get('/:id', todoController.findOne)
router.post('/', todoController.create)
router.delete('/:id', todoController.delete)
router.patch('/:id/complete', todoController.changeStatusComplete)
// router.patch('/:id/uncomplete', todoController.changeStatusUncomplete)

module.exports  = router