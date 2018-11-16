exports.seed = async function (knex, Promise) {
    // drop all foreign
    await knex.schema.table('cards', function (tbl) {
        tbl.dropForeign('deck_id');
    });
    // truncate all tables
    await knex('decks').truncate();
    await knex('cards').truncate();
    // re-establish foreign
    await knex.schema.table('cards', function (tbl) {
        tbl.foreign('deck_id').references('decks.id').onDelete('cascade');
    });
};