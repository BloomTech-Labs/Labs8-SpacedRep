exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('id').primary();
        tbl.string('user_id', 255).notNullable();
        tbl.string('tier').notNullable().defaultTo('free')
        tbl.json('card_progress').nullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
