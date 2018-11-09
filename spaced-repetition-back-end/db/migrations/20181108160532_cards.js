// Omitting codeSnippet for now until more research on the library is done.
// Tags omitted for same reason.
// CodeSnippet is omitted for now until formatting is decided.

exports.up = function (knex, Promise) {
    return knex.schema.createTable('cards', tbl => {
        tbl.increments('id').primary();
        tbl.string('title', 255).notNullable();
        tbl.string('question', 255).notNullable();
        tbl.string('answer', 255).notNullable();
        tbl.string('language', 255).notNullable(); // Need domain constraint
        tbl.integer('deck_id').notNullable().references('id').inTable('decks').onDelete('cascade');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('cards');
};
