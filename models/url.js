const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  original_url: { required: true, type: String },
  short_url: { required: true, type: String }
})

module.exports =  mongoose.model('short-url', schema)
