const express = require('express')
const controller = require('../controllers/user-controller')

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated())
        return res.redirect('/decks')
    next()
}

module.exports = function(passport) {
    const routes = express.Router()
    const authenticate = passport.authenticate(
        'local', 
        {
            successRedirect: '/',
            failureRedirect: '/login'
            // ,failureFlash: true // TODO: See flash
        }
    )

    routes.post('/signup', checkAuthenticated, controller.signup, authenticate)

    routes.post('/login', checkAuthenticated, authenticate)
    
    routes.post('/logout', controller.logout)

    return routes
}