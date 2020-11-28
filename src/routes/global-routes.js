const express = require('express')
const path = require('path')

const routes = express.Router()

routes.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
})

routes.get('/signup', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'signup.html'))
})

routes.get('/login', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'login.html'))
})

routes.use('/assets/styles', express.static(path.resolve(__dirname, '..', '..', 'public', 'styles')))
routes.use('/assets/scripts', express.static(path.resolve(__dirname, '..', '..', 'public', 'scripts')))
routes.use('/assets/images', express.static(path.resolve(__dirname, '..', '..', 'public', 'images')))

module.exports = routes