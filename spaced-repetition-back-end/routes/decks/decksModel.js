const db = require('../../knex.js');
const table = 'decks';

module.exports = {
  findByAuthor,
  add,
  update,
  remove,
  findByID,
};

function findByAuthor(id) {
  return db('cards')
    .select('cards.*', 'decks.name', 'decks.public', 'decks.tags')
    .innerJoin('decks', 'cards.deck_id', 'decks.id')
    .where('decks.author', id);
}

function findByID(id) {
  return db('cards')
    .select('cards.*', 'decks.name', 'decks.public', 'decks.tags')
    .innerJoin('decks', 'cards.deck_id', 'decks.id')
    .where('decks.id', id);
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