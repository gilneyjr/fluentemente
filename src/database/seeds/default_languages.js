exports.seed = async (knex) => {
    await knex('languages').insert([
        { name: 'Português' },
        { name: 'English' },
        { name: 'Español' },
        { name: 'Deutsch' },
        { name: 'Italiano' },
        { name: 'Français'}
    ])
}