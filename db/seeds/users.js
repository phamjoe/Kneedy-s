exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({first_name: 'Alice'}),
        knex('users').insert({first_name: 'Bob'}),
        knex('users').insert({first_name: 'Charlie'})
      ]);
    });
};
