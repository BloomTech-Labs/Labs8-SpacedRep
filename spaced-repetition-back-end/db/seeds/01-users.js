exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Saxon', isStudent: false },
        { name: 'Megan', isStudent: false },
        { name: 'Dave', isStudent: false },
        { name: 'Gabriel', isStudent: false },
        {
          name: 'testStudent',
          isStudent: true,
          decks: ['test-DeckID1', 'test-DeckID2']
        }
      ]);
    });
};

//decks are still being tested, need to figure out the best way to send arrays from knex to postgres
