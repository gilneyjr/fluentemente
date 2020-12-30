const service = require('../services/card-service')
const errors = require('../errors/errors')

async function getCardsNew(req, res) {
    const html = `
    <h1>Novo Cartão</h1>
    <div class="form">
        <label for="front">Frente</label>
        <input type="text" id="front" name="front">
        <label for="back">Verso</label>
        <input type="text" id="back" name="back">
        <div class="flex-container" style="justify-content:space-between">
            <span style="visible: false"></span>
            <input type="button" value="Criar" id="submit">
        </div>
    </div>`
    return res.send(html)
}

async function getCardsEdit(req, res) {
    // Check if user is owner of this card

    const card = { front: "Teste de frente", back: "Teste de back" }

    const html = `
    <h1>Editar Cartão</h1>
    <div class="form">
        <label for="front">Frente</label>
        <input type="text" id="front" name="front" value="${card.front}">
        <label for="back">Verso</label>
        <input type="text" id="back" name="back" value="${card.back}">
        <div class="flex-container" style="justify-content:space-between">
            <span style="visible: false"></span>
            <input type="button" value="Editar" id="submit">
        </div>
    </div>`
    return res.send(html)
}

async function list_cards(request, response) {
    const user_id = request.session.passport.user
    const deck_id = request.params.deck_id

    const cards = await service.list(deck_id, user_id)
    return response.json(cards)
}

async function new_card(request, response) {
    const user_id = request.session.passport.user
    const deck_id = request.params.deck_id
    const {
        front,
        back
    } = request.body

    await service.insert(front, back, deck_id, user_id)
    return response.sendStatus(200)
}

async function edit_card(request, response) {
    const user_id = request.session.passport.user
    const {
        id,
        deck_id
    } = request.params
    const {
        front,
        back
    } = request.body

    await service.edit(id, front, back, deck_id, user_id)
    return response.sendStatus(200)
}

async function delete_card(request, response) {
    const user_id = request.session.passport.user
    const {
        id,
        deck_id
    } = request.params

    await service.remove(id, deck_id, user_id)
    return response.sendStatus(200)
}

async function study(request, response) {
    const user_id = request.session.passport.user
    const deck_id = request.params.deck_id

    const cards = await service.list(deck_id, user_id)
    return response.json(cards.slice(0,10))
}

module.exports = {
    getCardsNew,
    getCardsEdit,
    list_cards,
    new_card,
    edit_card,
    delete_card,
    study
}