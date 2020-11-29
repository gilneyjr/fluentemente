const express = require('express')
const path = require('path')

const routes = express.Router()

// TODO: Implement this later
routes.get('/decks', (req, res) => {
    return res.send('This page is not implemented yet. <form action="/logout?_method=DELETE" method="POST"><input type="submit" value="Sair"></form>')
})

module.exports = routes