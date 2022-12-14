const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  x_name: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  }
})

module.exports = exerciseSchema