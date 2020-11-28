const knex = require('../database/connection');
const errors = require('../errors/errors');

async function signup(name, email, password) {
    try {
        await knex('users').insert({
            name,
            email,
            password
        })
    } catch (err) {
        if(err.errno === 19)
            throw new errors.EmailAlreadyExistError('E-mail já existe')
        console.error(err.errno)
        // console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

module.exports = {
    signup
}