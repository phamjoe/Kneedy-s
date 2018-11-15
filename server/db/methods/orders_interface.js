const knex = require('./knex_interface');

module.exports = {
  updateOrder: () => {

  },
  addNewOrder: (user_id, options) => {
    knex('orders').insert({
      date: new Date().toLocaleString(),
      user_id: user_id
    }).returning('id').then((resolve, reject) => {
      if (reject) throw reject;
      console.log(resolve + " options: " + options.length);
      options.forEach(el => {
        knex('products_by_order').insert({
          order_id: resolve[0],
          product_id: el.product_id,
          quantity: el.quantity
        }).then(console.log);
      });
    });
    return Promise.resolve(true);
  },
  getOrderDetails: (order_id) => {
    return knex('orders')
      .where({
        'orders.id': order_id
      })
      .join('products_by_order', 'orders.id', '=', 'products_by_order.order_id')
      .join('products', 'products_by_order.product_id', '=', 'products.id')
      .select('products.name', 'products.price', 'products_by_order.quantity');
  }
};
