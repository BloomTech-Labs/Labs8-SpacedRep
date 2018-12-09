exports.up = function (knex, Promise) {
    return knex.schema.createTable('cards', tbl => {
        tbl.increments('id').primary();
        tbl.string('title', 255).notNullable();
        tbl.string('question', 1000).notNullable();
        tbl.string('answer', 1000).notNullable();
        tbl.string('language', 255).notNullable(); // domain constraint?
        tbl.integer('deck_id').notNullable().references('id').inTable('decks').onDelete('cascade');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('cards');
};
