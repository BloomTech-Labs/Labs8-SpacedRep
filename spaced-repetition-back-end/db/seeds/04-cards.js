exports.seed = function (knex, Promise) {
  return knex('cards').insert([
    { title: 'SQL card test a', question: 'What is SQL?', answer: 'structured query language', deck_id: 1, language: 'Plain Text' },
    { title: 'React card test a', question: 'What is React?', answer: 'JS library', deck_id: 2, language: 'JavaScript' },
    { title: 'React card test b', question: 'Is React declarative?', answer: 'Yes', deck_id: 2, language: 'JavaScript' }
  ]);
};