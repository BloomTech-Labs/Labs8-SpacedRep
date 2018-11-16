
exports.up = function(knex, Promise) {
  return knex.schema.createTable('decks', tbl => {
    tbl.increments('id').primary();
    tbl.string('name', 255).notNullable();
    tbl.boolean('public').defaultTo(false);
    tbl.string('author').notNullable();
    tbl.string('tags', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('decks');
};
