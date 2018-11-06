
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Recipes').insert([
        {name: 'Salad with chicken', description: 'A healthy, simple salad recipe'},
        {name: 'Sirloin steak', description: 'Marinade to perfection with this recipe'},
        {name: 'Taco bowl', description: 'A low-carb spin on a popular Mexican dish'}
      ]);
    });
};
