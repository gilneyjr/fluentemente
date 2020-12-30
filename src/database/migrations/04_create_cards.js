exports.up = (knex) => {
    return knex.schema.createTable('cards', table => {
        table.increments('id').primary()
        table.string('front').notNullable()
        table.string('back').notNullable()
        table.integer('deck_id')
            .notNullable()
            .references('id')
            .inTable('decks')
    })
}

exports.down = (knex) => {
    return knex.schema.dropTable('cards')
}