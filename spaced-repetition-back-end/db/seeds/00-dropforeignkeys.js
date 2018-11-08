// drop all foreign
// truncate all tables
// re-establish foreign

// NOTE: commented out truncate on seeds!

exports.seed = async function(knex, Promise) {
  await knex.schema.table('decks', function(tbl) {
      tbl.dropForeign('author');
  });
  await knex('users').truncate();
  await knex('decks').truncate();
  await knex.schema.table('decks', function(tbl) {
      // tbl.foreign('author').references('id').inTable('users').onDelete('cascade');
      tbl.foreign('author').references('users.id');
  });
};