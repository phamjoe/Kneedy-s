"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 4040;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sass = require("node-sass-middleware");
const morgan = require('morgan');
//const knexLogger  = require('knex-logger');

let productDatabase = [{
    id: 1,
    name: 'burger',
    description: '8oz beef patty, with cheddar chesse, maple bacon, lettuce, tomato and our special sauce',
    price: 4.99,
    imgURL: '../public/src/images/person_2.jpg',
    type: 'food'
},
{
  id: 2,
  name: 'Sandwich',
  description: 'Le sandwich jambon beurre fromage',
  price: 6.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food'
},
{
  id: 3,
  name: 'Poutine',
  description: 'french fries... drowned into a gravy sauce and curly cheese',
  price: 2.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food'
},
{
  id: 4,
  name: 'Veggie Burger',
  description: 'we just removed the meet from our burger and voila',
  price: 4.49,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food'
},
{
  id: 5,
  name: 'Avocado Burger',
  description: 'Slices of fresh avocado, avocado bread with the famous guacamole sauce',
  price: 19.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food'
},
{
  id: 6,
  name: 'Empty burger',
  description: 'Two delicious gluten-free buns, filled with nothing.',
  price: 1.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'food'
},
{
  id: 7,
  name: 'Coca-Cola',
  description: 'Dark drink with bubbles in it. Sounds weird but it is good',
  price: 1.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'drink'
},
{
  id: 8,
  name: 'Water',
  description: 'You would be surprised, but in fact it is possible to drink this even if it is tasteless',
  price: 1.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'drink'
},
{
  id: 9,
  name: 'Root beer',
  description: 'Who did that? We do not know but some people appreciate it with their burgers',
  price: 1.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'drink'
},
{
  id: 9,
  name: 'Chocolatine',
  description: 'Just enjoy this amazing pastry, just perfectly named',
  price: 3.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'dessert'
},
{
  id: 9,
  name: 'Brownie',
  description: 'This will kill you, but it is really also really good',
  price: 3.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'dessert'
},
{
  id: 9,
  name: 'Crême brulée',
  description: 'You like caramel and you need a sweet hug? Try this!',
  price: 3.99,
  imgURL: '../public/src/images/person_2.jpg',
  type: 'dessert'
}];

app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/cart", (req, res) => {
  res.render("cart");
});
app.get("/checkout", (req, res) => {
  res.render("checkout");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/order", (req, res) => {
  let templateVars = {
    product: productDatabase
  };
  res.render("order", templateVars);
});

app.listen(PORT, () => {
  console.log("Front End Server listening on port " + PORT);
});