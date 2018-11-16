exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      return Promise.all([
        knex("products").insert({
          name: "burger",
          description:
            "8oz beef patty, with cheddar chesse, maple bacon, lettuce, tomato and our special sauce",
          price: 4.99,
          imgUrl: "http://localhost:8080/src/imgs/bottle.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Sandwich",
          description: "Le sandwich jambon beurre fromage",
          price: 6.99,
          imgUrl: "http://localhost:8080/src/imgs/pizza.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Poutine",
          description:
            "french fries... drowned into a gravy sauce and curly cheese",
          price: 2.99,
          imgUrl: "http://localhost:8080/src/imgs/burger.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Veggie Burger",
          description: "we just removed the meet from our burger and voila",
          price: 4.48,
          imgUrl: "http://localhost:8080/src/imgs/water.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Avocado Burger",
          description:
            "Slices of fresh avocado, avocado bread with the famous guacamole sauce",
          price: 19.99,
          imgUrl: "http://localhost:8080/src/imgs/juice.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Empty burger",
          description: "Two delicious gluten-free buns, filled with nothing.",
          price: 1.99,
          imgUrl: "http://localhost:8080/src/imgs/bawk.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Coca-Cola",
          description:
            "Dark drink with bubbles in it. Sounds weird but it is good",
          price: 1.99,
          imgUrl: "http://localhost:8080/src/imgs/salami.jpg",
          type: "drink"
        }),
        knex("products").insert({
          name: "Water",
          description:
            "You would be surprised, but in fact it is possible to drink this even if it is tasteless",
          price: 1.99,
          imgUrl: "http://localhost:8080/src/imgs/salami.jpg",
          type: "drink"
        }),
        knex("products").insert({
          name: "Root beer",
          description:
            "Who did that? We do not know but some people appreciate it with their burgers",
          price: 1.99,
          imgUrl: "http://localhost:8080/src/imgs/salami.jpg",
          type: "drink"
        }),
        knex("products").insert({
          name: "Chocolatine",
          description: "Just enjoy this amazing pastry, just perfectly named",
          price: 3.99,
          imgUrl: "http://localhost:8080/src/imgs/salami.jpg",
          type: "dessert"
        }),
        knex("products").insert({
          name: "Brownie",
          description: "This will kill you, but it is really also really good",
          price: 3.99,
          imgUrl: "http://localhost:8080/src/imgs/salami.jpg",
          type: "dessert"
        }),
        knex("products").insert({
          name: "Crême brulée",
          description: "You like caramel and you need a sweet hug? Try this!",
          price: 3.99,
          imgUrl: "http://localhost:8080/src/imgs/salami.jpg",
          type: "dessert"
        })
      ]);
    });
};
