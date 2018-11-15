exports.seed = function (knex, Promise) {
  return knex("users")
    .del()
    .then(function () {
      return Promise.all([
        knex("users").insert({
          first_name: "Alice",
          last_name: "wonderland",
          phone: "5555555555",
          email: "me@me.com"
        }),
        knex("users").insert({

          first_name: "Bob",
          last_name: "bill",
          phone: "2222222222",
          email: "me@me.com"
        }),
        knex("users").insert({
          first_name: "Charlie",
          last_name: "chocolate-factory",
          phone: "888888888",
          email: "me@me.com"
        })
      ]);
    });
};
