const express = require('express')
const path = require('path')

const routes = express.Router()

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated())
        return res.redirect('/decks')
    next()
}

routes.get('/', checkAuthenticated, (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
})

routes.get('/signup', checkAuthenticated, (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'signup.html'))
})

routes.get('/login', checkAuthenticated, (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'login.html'))
})

routes.use('/assets/styles', express.static(path.resolve(__dirname, '..', '..', 'public', 'styles')))
routes.use('/assets/scripts', express.static(path.resolve(__dirname, '..', '..', 'public', 'scripts')))
routes.use('/assets/images', express.static(path.resolve(__dirname, '..', '..', 'public', 'images')))

module.exports = routes