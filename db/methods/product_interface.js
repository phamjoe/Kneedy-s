const knex = require('./knex_interface');

module.exports = {
  getSpecificProduct: (id = null, ids = null) => {
    if (!ids) {
      knex('products')
        .where({
          'id': id
        })
        .then((resolve, reject) => {
          if (reject) throw reject;
          return [...resolve];
        })
    } else {
      knex('products')
        .whereIn('id', id)
        .then((resolve, reject) => {
          if (reject) throw reject;
          return [...resolve];
        })
    }
  },
  getAllProducts: () => {
    knex('products').then((resolve, reject) => {
      if (reject) throw reject;
      return [...resolve];
    });
  }
}
