const db = require('../knex.js');
const table = 'Recipes'

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db(table);
}

function findById(id) {
  return db(table)
    .where({ id })
    .first();
}

function add(entry) {
  return db(table)
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