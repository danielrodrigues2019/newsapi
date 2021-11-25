const express = require('express')

const routes = express.Router()

const User = require('./controllers/user.controller')
const Article = require('./controllers/article.controller')

routes.get('/', User.index)

// users routes
routes.post('/api/users', User.create)
routes.get('/api/users', User.index)
routes.get('/api/users/details/:_id', User.details)
routes.delete('/api/users/:_id', User.delete)
routes.put('/api/users/:_id', User.update)
routes.post('/api/users/login', User.login)
routes.get('/api/users/checktoken', User.checkToken)
routes.get('/api/users/destroytoken', User.destroyToken)


// articles routes
routes.post('/api/articles', Article.create)
routes.get('/api/articles', Article.index)
routes.get('/api/articles/details/:_id', Article.details)
routes.delete('/api/articles/:_id', Article.delete)
routes.put('/api/articles/:_id', Article.update)

module.exports = routes


