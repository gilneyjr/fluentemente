const knex = require('../database/connection');
const errors = require('../errors/errors');

async function list(user_id) {
    try {
        var decks = await knex('decks').where({ user_id })
        return decks.map(deck => {
            return {
                id: deck.id,
                name: deck.name,
            }
        })
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

async function findById(id) {
    try {
        return await knex('decks')
            .where({ id })
            .first()
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

async function insert(name, user_id) {
    try {
        await knex('decks').insert({
            name,
            user_id
        })
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

async function edit(id, name) {
    try {
        await knex('decks')
            .where({ id })
            .update({ name })
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

async function remove(id) {
    try {
        await knex('decks')
            .where({ id })
            .del()
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

module.exports = {
    list,
    findById,
    insert,
    edit,
    remove
}