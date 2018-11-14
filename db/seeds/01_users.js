exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        knex("users").insert({
          id: 1,
          first_name: "Alice",
          last_name: "wonderland",
          phone: "5555555555",
          email: "me@me.com"
        }),
        knex("users").insert({
          id: 2,
          first_name: "Bob",
          last_name: "bill",
          phone: "2222222222",
          email: "me@me.com"
        }),
        knex("users").insert({
          id: 3,
          first_name: "Charlie",
          last_name: "chocolate-factory",
          phone: "888888888",
          email: "me@me.com"
        })
      ]);
    });
};
