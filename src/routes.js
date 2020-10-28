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

module.exports = routes