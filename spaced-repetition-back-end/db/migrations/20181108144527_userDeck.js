exports.up = function(knex, Promise) {
  return knex.schema.createTable('userDeck', tbl => {
    tbl.increments().primary();
    tbl.integer('user_id').notNullable().references('id').inTable('users').onDelete('cascade');
    tbl.integer('deck_id').notNullable().references('id').inTable('decks').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('userDeck');
};