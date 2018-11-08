exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id').primary();
    tbl.string('firstName', 255).notNullable();
    tbl.string('lastName', 255).notNullable();
    tbl.string('email', 255).notNullable().unique();
    tbl.string('tier', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
