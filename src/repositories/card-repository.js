const knex = require('../database/connection');
const errors = require('../errors/errors');

async function list(deck_id) {
    try {
        var cards = await knex('cards').where({ deck_id })
        return cards.map(card => {
            return {
                id: card.id,
                front: card.front,
                back: card.back
            }
        })
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

async function insert(front, back, deck_id) {
    try {
        await knex('cards').insert({
            front,
            back,
            deck_id
        })
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

async function edit(id, front, back, deck_id) {
    try {
        await knex('cards')
            .where({ id })
            .update({
                front,
                back,
                deck_id
            })
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

async function remove(id, deck_id) {
    try {
        await knex('cards')
            .where({ id, deck_id })
            .del()
    } catch (err) {
        console.error('Error code: ' + err.errno)
        console.error('\n\n[INTERNAL ERROR]:\n'+err.stack + '\n\n');
        throw new errors.Internal_Server_Error()
    }
}

module.exports = {
    list,
    insert,
    edit,
    remove
}