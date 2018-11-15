exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function () {
      return Promise.all([
        knex("products").insert({
          name: "baguette",
          description: "big sandwich",
          price: 5.5,
          imgUrl: "http://localhost:8080/src/imgs/bottle.jpg",
          type: 'food'
        }),
        knex("products").insert({
          name: "pizza",
          description: "big pizza",
          price: 10.3,
          imgUrl: "http://localhost:8080/src/imgs/pizza.jpg",
          type: 'food'
        }),
        knex("products").insert({
          name: "burger",
          description: "big burger",
          price: 55.5,
          imgUrl: "http://localhost:8080/src/imgs/burger.jpg",
          type: 'food'
        }),
        knex("products").insert({
          name: "water",
          description: "big water",
          price: 60.5,
          imgUrl: "http://localhost:8080/src/imgs/water.jpg",
          type: 'drink'
        }),
        knex("products").insert({
          name: "juice",
          description: "big juice",
          price: 15.5,
          imgUrl: "http://localhost:8080/src/imgs/juice.jpg",
          type: 'drink'
        }),
        knex("products").insert({
          name: "chicken",
          description: "big chicken",
          price: 0.5,
          imgUrl: "http://localhost:8080/src/imgs/bawk.jpg",
          type: 'food'
        }),
        knex("products").insert({
          name: "salami",
          description: "big salami",
          price: 0.005,
          imgUrl: "http://localhost:8080/src/imgs/salami.jpg",
          type: 'food'
        })
      ]);
    });
};
