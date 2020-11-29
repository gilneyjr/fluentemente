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

async function findByEmail(email) {
    try {
        const user = await knex('users').where({ email }).first()
        if(!user)
            throw new errors.EmailDoesNotExistError('E-mail não existe')
        return user

    } catch(err) {
        if(err instanceof errors.Http_Error)
            throw err
        throw new errors.Internal_Server_Error()
    }
}

async function findById(id) {
    try {
        const user = await knex('users').where({ id }).first()
        if(!user)
            throw new errors.IdDoesNotExistError('Id não existe')
        return user
    } catch(err) {
        if(err instanceof errors.Http_Error)
            throw err
        throw new errors.Internal_Server_Error()
    }
}

module.exports = {
    signup,
    findByEmail,
    findById
}