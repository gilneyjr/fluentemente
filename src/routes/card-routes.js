const express = require('express')
const path = require('path')
const controller = require('../controllers/card-controller')

const routes = express.Router()

function checkNotAuthenticated(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login')
    return next()
}

routes.get('/cards/new', checkNotAuthenticated, controller.getCardsNew)
routes.get('/decks/:deck_id/cards/edit', checkNotAuthenticated, controller.getCardsEdit)
routes.get('/decks/:deck_id/study', checkNotAuthenticated, (req, res) => {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'template.html'))
})

routes.get('/api/decks/:deck_id/list-cards', checkNotAuthenticated, controller.list_cards)
routes.post('/api/decks/:deck_id/new-card', checkNotAuthenticated, controller.new_card)
routes.post('/api/decks/:deck_id/edit-card/:id', checkNotAuthenticated, controller.edit_card)
routes.delete('/api/decks/:deck_id/delete-card/:id', checkNotAuthenticated, controller.delete_card)
routes.get('/api/decks/:deck_id/study', checkNotAuthenticated, controller.study)


module.exports = routes