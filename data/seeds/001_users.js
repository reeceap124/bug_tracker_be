
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'email1@email.com', display_name: 'tester', password: 'securePass'},
        {email: 'user2@email.com', display_name: 'bill', password: 'notSecure'}
      ]);
    });
};
