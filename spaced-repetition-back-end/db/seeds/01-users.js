exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    // .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { firstName: 'Drew', lastName: 'Smith', email: 'drew@drew.com', tier: 'free' },
        { firstName: 'Gabe', lastName: 'Smith', email: 'gabe@gabe.com', tier: 'free' },
        { firstName: 'Megan', lastName: 'Smith', email: 'megan@megan.com', tier: 'free' },
        { firstName: 'Saxon', lastName: 'Smith', email: 'saxon@saxon.com', tier: 'free' },
      ]);
    });
};