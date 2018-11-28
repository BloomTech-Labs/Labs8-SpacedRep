exports.seed = function (knex, Promise) {
  return knex('decks').insert([
    { name: 'SQL', public: false, author: '2a', tags: 'tag1,tag2,tag3' },
    { name: 'React', public: false, author: '2a', tags: 'tag1,tag2,tag3' },
    { name: 'ES6', public: false, author: '1a', tags: 'tag1,tag2,tag3' },
    { name: 'Chemistry', public: false, author: '1a', tags: 'tag1,tag2,tag3' },
    { name: 'Chemistry', public: true, author: '3a', tags: 'tag1,tag2,tag3' },
    { name: 'SQL', public: false, author: 'O0rdtSBCU2ebbFreJzN14MUWz5EyMr34@clients', tags: 'tag1,tag2,tag3' },
    { name: 'React', public: false, author: 'O0rdtSBCU2ebbFreJzN14MUWz5EyMr34@clients', tags: 'tag1,tag2,tag3' },
  ]);
};


'auth0|5becfdb55e900369483e2a9b'