const service = require('../services/deck-service')
const errors = require('../errors/errors')

async function getDecksNew(req, res) {
    // Check if user is valid

    const html = `
    <h1>Novo Baralho</h1>
    <div class="form">
        <label for="name">Nome</label>
        <input type="text" id="name" name="name">
        <div class="flex-container" style="justify-content:space-between">
            <span style="visible: false"></span>
            <input type="button" value="Criar" id="submit">
        </div>
    </div>`
    return res.send(html)
}

async function getDecksEdit(req, res) {
    // TODO: Check if user is valid
    // TODO: Check if deck_id is valid

    const deck_id = req
    const value = 'Teste para valor'
    const html = `
    <h1>Editar Baralho</h1>
    <div class="form">
        <label for="name">Nome</label>
        <input type="text" id="name" name="name" value="${value}">
        <div class="flex-container" style="justify-content:space-between">
            <span style="visible: false"></span>
            <input type="button" value="Editar" id="submit">
        </div>
    </div>`
    return res.send(html)
}

async function list_decks(request, response) {
    const user_id = request.session.passport.user
    const decks = await service.list(user_id)
    return response.json(decks)
}

async function get_deck(request, response) {
    const id = request.params.id
    const user_id = request.session.passport.user

    const decks = await service.get(id, user_id)
    return response.json(decks)
}

async function new_deck(request, response) {
    const { name } = request.body
    const user_id = request.session.passport.user

    await service.insert(name, user_id)
    return response.sendStatus(200)
}

async function edit_deck(request, response) {
    const id = request.params.id
    const name = request.body.name
    const user_id = request.session.passport.user
    await service.edit(id, name, user_id)
    return response.sendStatus(200)
}

async function delete_deck(request, response) {
    const id = request.params.id
    const user_id = request.session.passport.user
    
    await service.remove(id, user_id)
    return response.sendStatus(200)
}

module.exports = {
    getDecksNew,
    getDecksEdit,
    list_decks,
    get_deck,
    new_deck,
    edit_deck,
    delete_deck
}