exports.up = (knex) => {
    return knex.schema.createTable('users_languages', table => {
        table.increments('id').primary()

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            
        table.integer('language_id')
            .notNullable()
            .references('id')
            .inTable('languages')
    })
}

exports.down = (knex) => {
    return knex.schema.dropTable('users_languages')
}