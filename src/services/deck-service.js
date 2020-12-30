const repository = require('../repositories/deck-repository')
const userService = require('./user-service')

async function list(user_id) {
    // Check if user exists
    await userService.findById(user_id)
    return await repository.list(user_id)
}

async function get(id, user_id) {
    // Check if user exists
    await userService.findById(user_id)
    return await repository.findById(id)
}

async function insert(name, user_id) {
    // Check if user exists
    await userService.findById(user_id)
    
    // TODO: Check if name is valid

    // Insert deck to database
    await repository.insert(name, user_id)
}

async function edit(id, name, user_id) {
    // TODO: Check if id is a valid
    // TODO: Check if name is a valid
    // TODO: Check if user from user_id is onw of this deck
    if(!user_id)
        console.log('TODO: LATER')

    await repository.edit(id, name)
}

async function remove(id, user_id) {
    // TODO: Check if id is a valid
    // TODO: Check if name is a valid
    // TODO: Check if user from user_id is onw of this deck
    if(!user_id)
        console.log('TODO: LATER')

    await repository.remove(id)
}

module.exports = {
    list,
    get,
    insert,
    edit,
    remove
}