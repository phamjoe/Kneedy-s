exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function (table) {
      table.increments('id').primary();
      table.date('date');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders')
  ]);
};
