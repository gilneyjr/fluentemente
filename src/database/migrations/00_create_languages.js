exports.up = (knex) => {
    return knex.schema.createTable('languages', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
    })
}

exports.down = (knex) => {
    return knex.schema.dropTable('languages')
}