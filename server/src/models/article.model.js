const mongoose = require('mongoose')
const moment = require('moment')


const DataSchema = new mongoose.Schema({
  title:String,
  content:String,
  publishDate: {
    type: String,
    require: false
  } 
},{
  timestaps:true
})

const articles = mongoose.model('Articles', DataSchema)
module.exports = articles