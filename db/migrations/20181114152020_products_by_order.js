exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products_by_order', function (table) {
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.id');
      table.integer('product_id').unsigned();
      table.foreign('product_id').references('products.id');
      table.integer('quantitiy').unsigned();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('products_by_order')
};
