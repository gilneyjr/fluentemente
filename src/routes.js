const { request, response } = require('express')
const express = require('express')
const knex = require('./database/connection')

const routes = express.Router()

routes.get('/languages', async (request, response) => {
    const languages = await knex('languages').select('*')
    return response.json(languages)
})

routes.post('/users', async (request, response) => {
    const {
            username,
            password,
            password2,
            email,
            languages,
    } = request.body

    await knex('users').insert({
        username,
        password,
        email,
    })

    console.log(typeof languages)

    return response.json({success: true})
})



// Static Pages: FIX IT AFTER [BEGIN]
const path = require('path')

routes.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

routes.get('/entrar', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'login.html'))
})

routes.post('/entrar', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'decks.html'))
})

routes.get('/novo-usuario', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'signup.html'))
})

routes.post('/novo-usuario', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'login.html'))
})

routes.get('/baralhos', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'decks.html'))
})

routes.get('/cartas', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'cards.html'))
})

// Static Pages: FIX IT AFTER [END]

module.exports = routes