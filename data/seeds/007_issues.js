
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').del()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {title: 'first issue', content: 'minimal content', open: true, importance: 2, project_key: 1, created_by: 1},
        {title: 'issue two', content: 'minimal content', open: true, importance: 1, project_key: 1, created_by: 2}
      ]);
    });
};
