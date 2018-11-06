
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Recipes', function(tbl) {
    tbl.increments(); // by default creates an id field that auto increments
    tbl.string('name', 255).notNullable();
    tbl.string('description').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Recipes');
};
