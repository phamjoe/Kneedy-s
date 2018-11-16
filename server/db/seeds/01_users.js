exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        knex("users").insert({
          first_name: "Alice",
          last_name: "wonderland",
          phone: "4165222220",
          email: "tinman@witch.com"
        }),
        knex("users").insert({
          first_name: "Bob",
          last_name: "bill",
          phone: "2267007741",
          email: "Bob@bill.com"
        }),
        knex("users").insert({
          first_name: "Charlie",
          last_name: "chocolate-factory",
          phone: "2267007741",
          email: "Charlie@chocolate.com"
        }),
        knex("users").insert({
          first_name: "Jayvon",
          last_name: "Whitaker",
          phone: "4165222220",
          email: "Jayvon@Whitaker.com"
        }),
        knex("users").insert({
          first_name: "Maribel",
          last_name: "Ware",
          phone: "2267007741",
          email: "Maribel@Ware.com"
        }),
        knex("users").insert({
          first_name: "Abraham",
          last_name: "Merritt",
          phone: "4165222220",
          email: "Abraham@Merritt.com"
        }),
        knex("users").insert({
          first_name: "Susan",
          last_name: "Hines",
          phone: "2267007741",
          email: "Susan@Hines.com"
        })
      ]);
    });
};
