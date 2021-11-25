const User = require('../models/user.model')
const jwt = require("jsonwebtoken");
const secret = "mysecret";

module.exports = {
  async index(req,res){
    const user = await User.find()
    res.json(user)
  },

  async create(req,res){
    const {user_name, user_email, user_type, user_password} = req.body
      let data = {}
      let user = await User.findOne({user_email})

      if(!user){
        data = {user_name, user_email, user_type, user_password}
        user = await User.create(data)
        return res.status(200).json(user)
      }else{
        return res.status(500).json(user)
      }
  },

  async details(req,res){
    const _id = req.params._id
    const user = await User.findOne({_id})
    res.json(user)
  },

  async delete(req,res){
    const _id = req.params._id
    const user = await User.findByIdAndDelete({_id})
    return res.json(user)
  },

  async update(req,res) {
    const {_id, user_name, user_email, user_type, user_password} = req.body
    const data = {user_name, user_email, user_type, user_password}
    const user = await User.findOneAndUpdate({_id}, data, {new:true})
    res.json(user)
  },

  async login(req,res) {
    const {email, password} = req.body
    User.findOne({user_email:email, user_type:1}, function(err, user){
      if(err){
        console.log(err)
        res.status(200).json({erro: "Servidor Error. Please try again"})
      }else if (!user){
        res.status(200).json({status:2, error: "E-mail inválido"})
      }else{
        user.isCorrectPassword(password, async function (err, same){
          if(err){
            res.status(200).json({erro: "Servidor Error. Please try again"})
          }else if(!same){
            res.status(200).json({status:2, error: "Senha inválida"});
          }else{
            const payload = { email }
            const token = jwt.sign(payload, secret, {
                expiresIn: '24h'
            })
            res.cookie('token', token, {httpOnly: true});
            res.status(200).json({status:1, auth:true, token:token, id_client: user._id, user_name:user.user_name, user_type:user.user_type});
          }
        })
        
    }
    })
  }
}