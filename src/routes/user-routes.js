const express = require('express')
const controller = require('../controllers/user-controller')

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated())
        return res.redirect('/decks')
    next()
}

module.exports = function(passport) {
    const routes = express.Router()

    routes.post('/signup', checkAuthenticated, controller.signup)

    routes.post('/login', checkAuthenticated, passport.authenticate(
        'local', 
        {
            successRedirect: '/',
            failureRedirect: '/login'
            // ,failureFlash: true // TODO: See flash
        }
    ))
    
    routes.delete('/logout', controller.logout)

    return routes
}