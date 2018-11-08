// drop all foreign
// truncate all tables
// re-establish foreign

// NOTE: commented out truncate on seeds!

exports.seed = async function (knex, Promise) {
    await knex.schema.table('decks', function (tbl) {
        tbl.dropForeign('author');
    });
    await knex.schema.table('userDeck', function (tbl) {
        tbl.dropForeign('user_id');
        tbl.dropForeign('deck_id');
    });
    await knex('users').truncate();
    await knex('decks').truncate();
    await knex('userDeck').truncate();
    await knex.schema.table('decks', function (tbl) {
        // tbl.foreign('author').references('id').inTable('users').onDelete('cascade');
        tbl.foreign('author').references('users.id');
    });
    await knex.schema.table('userDeck', function (tbl) {
        // tbl.foreign('author').references('id').inTable('users').onDelete('cascade');
        tbl.foreign('user_id').references('users.id');
        tbl.foreign('deck_id').references('decks.id');
    });
};