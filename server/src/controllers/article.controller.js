const Article = require('../models/article.model')

module.exports = {
  async index(req,res){
    const article = await Article.find()
    res.json(article)
  },

  async create(req,res){
    const {title, content, publishDate} = req.body
      let data = {}
      let article = await Article.findOne({title})

      if(!article){
        data = {title, content, publishDate}
        article = await Article.create(data)
        return res.status(200).json(article)
      }else{
        return res.status(500).json(article)
      }
  },

  async details(req,res){
    const _id = req.params._id
    const article = await Article.findOne({_id})
    res.json(article)
  },

  async delete(req,res){
    const _id = req.params._id
    const article = await Article.findByIdAndDelete({_id})
    return res.json(article)
  },

  async update(req,res) {
    const {_id, title, content, publishDate} = req.body
    const data = {title, content, publishDate}
    const article = await Article.findOneAndUpdate({_id}, data, {new:true})
    res.json(article)
  }
}