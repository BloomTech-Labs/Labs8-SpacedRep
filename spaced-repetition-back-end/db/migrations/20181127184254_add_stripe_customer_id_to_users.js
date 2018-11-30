exports.up = function (knex, Promise) {
    return knex.schema.table('users', tbl => {
        tbl.string('stripe_customer_id').nullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('users', (tbl) => tbl.dropColumn('stripe_customer_id'));
};
