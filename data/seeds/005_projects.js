
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {title: 'super project 1', active: true, org_key: 1},
        {title: 'super project 2', active: true, org_key: 1},
        {title: 'super project 3', active: false, org_key: 1}
      ]);
    });
};
