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


// Routes to static items
const path = require('path')
const controllers = require('./controllers/controllers')

console.log(path.resolve(__dirname, '..', 'public', 'images'))
routes.use('/assets/styles', express.static(path.resolve(__dirname, '..', 'public', 'css')))
routes.use('/assets/images', express.static(path.resolve(__dirname, '..', 'public', 'images')))

// Static Pages: FIX IT AFTER [BEGIN]


routes.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

routes.post('/signup', controllers.userController.signUp)

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