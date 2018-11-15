const knex = require('./knex_interface');

module.exports = {
  addNewUser: () => {},
  getAllPastOrders: (user_id) => {
    return knex('orders')
      .where({
        'orders.user_id': user_id
      })
      .join('products_by_order', 'orders.id', '=', 'products_by_order.order_id')
      .join('products', 'products_by_order.product_id', '=', 'products.id')
      .select('orders.date', 'products_by_order.quantity', 'products.name', 'orders.id');
  },
  getUserInfo: (user_id) => {
    return knex('users').where({
      id: user_id
    });
  },
  verifyUser: () => {}
};
