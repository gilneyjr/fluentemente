const express = require('express')
const path = require('path')
const controller = require('../controllers/deck-controller')

const routes = express.Router()

function checkNotAuthenticated(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login')
    return next()
}

routes.get('/decks/new', checkNotAuthenticated, controller.getDecksNew)
routes.get('/decks/edit/:id', checkNotAuthenticated, controller.getDecksEdit)
routes.get('/decks', checkNotAuthenticated, (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'template.html'))
})

routes.get('/decks/:id', checkNotAuthenticated, (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'template.html'))
})


routes.get('/api/list-decks', checkNotAuthenticated, controller.list_decks)
routes.get('/api/decks/:id', checkNotAuthenticated, controller.get_deck)
routes.post('/api/new-deck/', checkNotAuthenticated, controller.new_deck)
routes.post('/api/edit-deck/:id', checkNotAuthenticated, controller.edit_deck)
routes.delete('/api/delete-deck/:id', checkNotAuthenticated, controller.delete_deck)

module.exports = routes