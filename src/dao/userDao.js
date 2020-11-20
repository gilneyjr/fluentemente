const knex = require('../database/connection')

async function insert(name, email, password) {
    await knex('users').insert({
        name,
        email,
        password
    })
}

module.exports = {
    insert
}