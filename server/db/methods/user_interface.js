const knex = require('./knex_interface');

module.exports = {
  // Adds a new user
  addNewUser: () => {
    // will be implemented at some point in the future
  },
  // Gets all past orders made by a user
  getAllPastOrders: (user_id) => {
    return knex('orders')
      .where({
        'orders.user_id': user_id
      })
      .join('products_by_order', 'orders.id', '=', 'products_by_order.order_id')
      .join('products', 'products_by_order.product_id', '=', 'products.id')
      .select('orders.date', 'products_by_order.quantity', 'products.name', 'orders.id');
  },
  // Gets all relevant user info
  getUserInfo: (user_id) => {
    return knex('users').where({
      id: user_id
    });
  },
  verifyUser: () => {}
};
