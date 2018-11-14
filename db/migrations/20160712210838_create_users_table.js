exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.varchar('phone', 20);
      table.text('email');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
