exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("orders")
    .del()
    .then(function() {
      return Promise.all([
        knex("orders").insert({
          date: new Date(),
          user_id: 1
        }),
        knex("orders").insert({
          date: new Date(),
          user_id: 2
        }),
        knex("orders").insert({
          date: new Date(),
          user_id: 3
        })
      ]);
    });
};
