
exports.up = function(knex, Promise) {
  return knex.schema.createTable('decks', tbl => {
    tbl.increments('id').primary();
    tbl.string('name', 255).notNullable();
    tbl.boolean('public').defaultTo(false);
    tbl.integer('author').notNullable().references('id').inTable('users').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('decks');
};
