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
      options.forEach(el => {
        knex('products_by_order').insert({
          order_id: resolve[0],
          product_id: el.product_id,
          quantity: el.quantity
        });
      });
    });
  }
};
