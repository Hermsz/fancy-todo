const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

// create new User schema
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function(next) {
  if(this.password) {
    this.password = hashPassword(this.password)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User