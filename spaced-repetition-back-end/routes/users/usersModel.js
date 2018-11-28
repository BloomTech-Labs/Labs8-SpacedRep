const db = require('../../knex.js');
const util = require('util');
const table = 'users';

module.exports = {
    find,
    findByUser,
    createUser,
    upsertTier,
    freeToPaid
};

function find() {
    return db(table);
}

function findByUser(id) {
    return db(table)
        .where('user_id', id);
}
// onExists return tier else insert return tier
function upsertTier({ user_id, tier }) {
    return db(table).where({ user_id }).update({ tier });
}

function createUser(id) {
    return findByUser(id).then(user => {
        if (user[0]) return user[0];
        else {
            console.log('user not found, creating user');
            return db(table).returning('id').insert({ user_id: id });
        }
    });
}

function freeToPaid(user_id, customerId) {
    const changes = { 'tier': 'paid', 'stripe_customer_id': customerId };
    return db(table)
        .where({ user_id })
        .update(changes);
}