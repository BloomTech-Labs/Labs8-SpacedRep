exports.seed = function (knex, Promise) {
  return knex('decks').insert([
    { name: 'SQL', public: false, author: '2a', tags: 'tag1,tag2,tag3' },
    { name: 'React', public: false, author: '2a', tags: 'tag1,tag2,tag3' },
    { name: 'ES6', public: false, author: '1a', tags: 'tag1,tag2,tag3' },
    { name: 'Chemistry', public: false, author: '1a', tags: 'tag1,tag2,tag3' },
    { name: 'Chemistry', public: true, author: '3a', tags: 'tag1,tag2,tag3' },
  ]);
};