"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 4040;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sass = require("node-sass-middleware");
const morgan = require('morgan');
//const knexLogger  = require('knex-logger');

let productDatabase = {
    id: 1,
    product: 'burger',
    desc: '8oz beef patty, with cheddar chesse, maple bacon, lettuce, tomato and our special sauce',
    price: 4.99,
    
};

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