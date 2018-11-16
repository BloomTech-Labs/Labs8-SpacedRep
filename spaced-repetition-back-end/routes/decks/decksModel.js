const db = require('../../knex.js');
const table = 'decks';

module.exports = {
  findByAuthor,
  findByJct,
  cardsArrTest,
  add,
  update,
  remove,
  format
};

function findByAuthor(id) {
  return db(table)
    .select('id', 'name', 'public', 'tags')
    .where('author', id)
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

function format(arr) {
  let deckNames = {};
  let formattedData = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    // if deck exists, push just the card to the object's card array
    if (deckNames[arr[i].name]) {
      formattedData[deckNames[arr[i].name]].cards.push({
          "id": arr[i].id,
          "title": arr[i].title,
          "question": arr[i].question,
          "answer": arr[i].answer,
          "language": arr[i].language
        })
    } else {
      // if deck does not exist, push the deck to formattedData array
      // add property to deckname objects and assign value of count (for referencing in the array)
      deckNames[arr[i].name] = count++;
      formattedData.push({
        "id": arr[i].deck_id,
        "name": arr[i].name,
        "public": arr[i].public,
        "author": arr[i].author,
        "user_id": arr[i].user_id,
        "cards": [{
          "id": arr[i].id,
          "title": arr[i].title,
          "question": arr[i].question,
          "answer": arr[i].answer,
          "language": arr[i].language
        }] 
      })
    }
  }
  return formattedData;
}