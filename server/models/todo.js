const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create new User schema
const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String
  },
  dueDate: {
    type: Date
  },
  user_id: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
})

const task = mongoose.model('Task', taskSchema)
module.exports = task