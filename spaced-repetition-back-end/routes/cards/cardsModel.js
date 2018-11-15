const db = require('../../knex.js');
const table = 'cards';

module.exports = {
  find,
  findById,
  findByDeck,
  add,
  update,
  remove
};

function find() {
  return db(table);
}

function findById(id) {
  return db(table)
    .where({ id })
    .first();
}

function findByDeck(id) {
  return db(table)
    .where('deck_id', id)
}

function add(entry) {
  return db(table)
    .returning('id')
    .insert(entry)
    .into(table);
}

function update(id, changes) {
  return db(table)
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db(table)
    .where({ id })
    .del();
}
