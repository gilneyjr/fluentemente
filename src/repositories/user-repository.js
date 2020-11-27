const knex = require('../database/connection')

async function signup(name, email, password) {
    await knex('users').insert({
        name,
        email,
        password
    })
}

module.exports = {
    signup
}