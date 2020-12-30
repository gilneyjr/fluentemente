const repository = require('../repositories/card-repository')
const deckService = require('./deck-service')

async function list(deck_id, user_id) {
    // Check if card exist and if user is own of it
    await deckService.get(deck_id, user_id)

    return await repository.list(deck_id)
}

async function insert(front, back, deck_id, user_id) {
    // Check if deck exists and if user is own of it
    await deckService.get(deck_id, user_id)

    await repository.insert(front, back, deck_id)
}

async function edit(id, front, back, deck_id, user_id) {
    // Check if deck exists and if user is own of it
    await deckService.get(deck_id, user_id)

    await repository.edit(id, front, back, deck_id)
}


async function remove(id, deck_id, user_id) {
    // Check if deck exists and if user is own of it
    await deckService.get(deck_id, user_id)

    await repository.remove(id, deck_id)
}

module.exports = {
    list,
    insert,
    edit,
    remove
}