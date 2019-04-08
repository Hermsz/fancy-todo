const router = require('express').Router()
const user = require('./users')
const task = require('./todo')

router.use('/users', user)
router.use('/todos', task)

module.exports  = router