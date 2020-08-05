
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('importance').del()
    .then(function () {
      // Inserts seed entries
      return knex('importance').insert([
        {level: 'High'},
        {level: 'Medium'},
        {level: 'Low'}
      ]);
    });
};
