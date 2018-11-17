const knex = require('./knex_interface');

module.exports = {
  // Get product by id
  getSpecificProduct: (id = null, ids = null) => {
    if (!ids) {
      return knex('products')
        .where({
          'id': id
        })
        .then((resolve, reject) => {
          if (reject) throw reject;
          return resolve;
        })
    } else {
      return knex('products')
        .whereIn('id', id)
        .then((resolve, reject) => {
          if (reject) throw reject;
          return resolve;
        })
    }
  },
  // Get all products in the inventory
  getAllProducts: () => {
    return knex('products').then((resolve, reject) => {
      if (reject) throw reject;
      return resolve;
    });
  }
};
