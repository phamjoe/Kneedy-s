exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products_by_order').del()
    .then(function () {
      // Inserts seed entries
      return knex('products_by_order').insert([{
          order_id: 1,
          product_id: 1,
          quantity: 1
        },
        {
          order_id: 1,
          product_id: 2,
          quantity: 2
        },
        {
          order_id: 1,
          product_id: 5,
          quantity: 1
        },
        {
          order_id: 1,
          product_id: 4,
          quantity: 1
        },
        {
          order_id: 2,
          product_id: 5,
          quantity: 1
        },
        {
          order_id: 2,
          product_id: 3,
          quantity: 1
        },
        {
          order_id: 2,
          product_id: 4,
          quantity: 1
        },
        {
          order_id: 2,
          product_id: 3,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 5,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 4,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 3,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 2,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 1,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 6,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 5,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 7,
          quantity: 1
        },
        {
          order_id: 3,
          product_id: 5,
          quantity: 1
        },
      ]);
    });
};
