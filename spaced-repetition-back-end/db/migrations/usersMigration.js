exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments().primary(); // by default creates an id field that auto increments
    tbl.string('name', 255).notNullable();
    tbl.boolean('isStudent').defaultTo(false);
    tbl.specificType('decks', 'TEXT[]');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Users');
};
