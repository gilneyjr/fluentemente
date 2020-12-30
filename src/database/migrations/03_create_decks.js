exports.up = (knex) => {
    return knex.schema.createTable('decks', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
    })
}

exports.down = (knex) => {
    return knex.schema.dropTable('decks')
}