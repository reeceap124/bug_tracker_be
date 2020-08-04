
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_org_roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_org_roles').insert([
        {user_key: 1, role_key: 1, org_key: 1},
        {user_key: 1, role_key: 2, org_key:2},
        {user_key: 1, role_key: 3, org_key:3},
        {user_key: 2, role_key: 1, org_key:2}
      ]);
    });
};
