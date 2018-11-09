exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('userDeck')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('userDeck').insert([
        { user_id: 2, deck_id: 1 },
        { user_id: 2, deck_id: 2 },
        { user_id: 1, deck_id: 3 },
        { user_id: 1, deck_id: 4 },
        { user_id: 3, deck_id: 5 },
        { user_id: 2, deck_id: 5 }, // testing public/shared decks
        { user_id: 4, deck_id: 5 }, // testing public/shared decks
      ]);
    });
};