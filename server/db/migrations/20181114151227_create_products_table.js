exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.float('price');
      table.text('imgUrl');
      table.string('type');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
  ]);
};
