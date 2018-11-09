exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks')
    // .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('decks').insert([
        { name: 'SQL', public: false, author: 2 },
        { name: 'React', public: false, author: 2 },
        { name: 'ES6', public: false, author: 1 },
        { name: 'Chemistry', public: false, author: 1 },
        { name: 'Chemistry', public: true, author: 3 }, // Testing second entry with same name
      ]);
    });
};