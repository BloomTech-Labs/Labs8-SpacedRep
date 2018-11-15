const db = require('../../knex.js');
const table = 'decks';

module.exports = {
  find,
  findById,
  findByAuthor,
  findByJct,
  cardsArrTest,
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

function findByAuthor(id) {
  return db(table)
    .where('author', id)
}

function findByJct(id) {
  return db(table)
    .innerJoin('userDeck', 'decks.id', 'userDeck.deck_id')
    .where('userDeck.user_id', id)
}

function cardsArrTest(id) {
  return db(table)
  .innerJoin('userDeck', 'decks.id', 'userDeck.deck_id')
  .innerJoin('cards', 'decks.id', 'cards.deck_id')
  .where('userDeck.user_id', id)
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
