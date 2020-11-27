const express = require('express')
const path = require('path')
const controller = require(path.resolve(__dirname, '..', 'controllers', 'user-controller'))

const routes = express.Router()

routes.post('/signup', controller.signup)
routes.post('/login', controller.login)
routes.post('/logout', controller.logout)

module.exports = routes