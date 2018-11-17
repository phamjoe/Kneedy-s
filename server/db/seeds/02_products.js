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
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391910/gg/menu-1.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Sandwich",
          description: "Le sandwich jambon beurre fromage",
          price: 6.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391915/gg/sandwich.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Poutine",
          description:
            "french fries... drowned into a gravy sauce and curly cheese",
          price: 2.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391913/gg/poutine.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Not Meet Burger",
          description:
            "we just removed the meet from our burger and voila, not-meet",
          price: 4.48,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391904/gg/burger-3.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Avocado Burger",
          description:
            "Slices of fresh avocado, avocado bread with the famous guacamole sauce",
          price: 19.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391898/gg/avocado-burger.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Empty burger",
          description: "Two delicious gluten-free buns, filled with nothing.",
          price: 1.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391904/gg/burger-empty.jpg",
          type: "food"
        }),
        knex("products").insert({
          name: "Coca-Cola",
          description:
            "Dark drink with bubbles in it. Sounds weird but it is good",
          price: 1.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391905/gg/coca-cola.jpg",
          type: "drink"
        }),
        knex("products").insert({
          name: "Water",
          description:
            "You would be surprised, but in fact it is possible to drink this even if it is tasteless",
          price: 1.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391915/gg/water.jpg",
          type: "drink"
        }),
        knex("products").insert({
          name: "Root beer",
          description:
            "Who did that? We do not know but some people appreciate it with their burgers",
          price: 1.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391914/gg/root-beer.jpg",
          type: "drink"
        }),
        knex("products").insert({
          name: "Chocolatine",
          description: "Just enjoy this amazing pastry, just perfectly named",
          price: 3.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391904/gg/chocolatine.jpg",
          type: "dessert"
        }),
        knex("products").insert({
          name: "Brownie",
          description: "This will kill you, but it is really also really good",
          price: 3.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391902/gg/brownie.jpg",
          type: "dessert"
        }),
        knex("products").insert({
          name: "Crême brulée",
          description: "You like caramel and you need a sweet hug? Try this!",
          price: 3.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542391906/gg/creme-brulee.jpg",
          type: "dessert"
        }),
        knex("products").insert({
          name: "Sriracha Burger",
          description: "Hot burger for HOT person",
          price: 8.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542493872/new/secret-burger-4.jpg",
          type: "secret"
        }),
        knex("products").insert({
          name: "Broccoli Burger",
          description: "So you won't feel bad eating a burger",
          price: 6.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542493871/new/secret-burger-1.jpg",
          type: "secret"
        }),
        knex("products").insert({
          name: "Rainbow Sandwich",
          description: "Taste the Rainbow (it doesn't taste that great)",
          price: 3.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542493870/new/secret-burger-2.jpg",
          type: "secret"
        }),
        knex("products").insert({
          name: "Tiny Burger",
          description: "For those counting their calories",
          price: 1.99,
          imgUrl:
            "https://res.cloudinary.com/kneedys/image/upload/v1542493871/new/secret-burger-3.jpg",
          type: "secret"
        })
      ]);
    });
};
