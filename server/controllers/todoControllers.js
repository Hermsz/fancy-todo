const Todo = require('../models/todo')

class TodoController {
  
  static findAll(req, res) {
    Todo
      .find({
        user_id: req.params.id
      })
      .populate('user_id')
      .then(allTodo => {
        res.status(200).json(allTodo)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static findOne(req, res) {
    Todo
      .findById(req.params.id)
      .populate('user_id')
      .then(task => {
        res.status(200).json(task)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static create(req, res) {
    let newTodo = {
      taskName: req.body.taskName,
      description: req.body.description,
      status: `uncomplete`,
      dueDate: req.body.dueDate,
      user_id: req.body.user_id
    }
    Todo
      .create(newTodo)
      .then(newTodo => {
        res.status(200).json(newTodo)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static changeStatusComplete(req, res) {
    Todo
      .findById(req.params.id)
      .then(task => {
        task.status = 'completed'
        task.save()
        res.status(200).json(task)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static delete(req, res) {
    Todo
      .findOneAndRemove({
        _id: req.params.id
      })
      .then(task => {
        res.status(200).json(task)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = TodoController
