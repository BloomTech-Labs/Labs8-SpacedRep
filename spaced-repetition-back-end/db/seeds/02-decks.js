// ERROR: cannot truncate a table referenced in a foreign key constraint
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks')
    // .truncate()
    .then(function() {
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

// drop foreign
// truncate
// re-establish foreign
// then seed
// exports.seed = async function(knex, Promise) {
//   await knex.schema.table('decks', function(tbl) {
//       tbl.dropForeign('author');
//   });
//   await knex('decks').truncate();
//   await knex.schema.table('decks', function(tbl) {
//       tbl.foreign('author').notNullable().references('id').inTable('users').onDelete('cascade');
//   });
//   await function() {
//     return knex('decks').insert([
//       { name: 'SQL', public: false, author: 2 },
//       { name: 'React', public: false, author: 2 },
//       { name: 'ES6', public: false, author: 1 },
//       { name: 'Chemistry', public: false, author: 1 },
//       { name: 'Chemistry', public: true, author: 3 }, // Testing second entry with same name
//     ]);
//   }
// };