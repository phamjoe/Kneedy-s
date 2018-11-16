"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 4040;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sass = require("node-sass-middleware");
const morgan = require('morgan');
const fetch = require('node-fetch');
//const knexLogger  = require('knex-logger');


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
  res.render("cart", {
    "cart": true
  });
});
app.get("/checkout", (req, res) => {
  res.render("checkout");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/order", (req, res) => {
  const url = ' https://kneedys-api.herokuapp.com/products';
  fetch(url, {
    method: 'GET',
  }).then((response) => {
    response.body.on('data', (e) => {
      let productDatabase = JSON.parse(e);
      let templateVars = {
        product: productDatabase
      };
      res.render("order", templateVars);
    });
  }).catch(err => {
    console.log(err);
  });

});

app.listen(PORT, () => {
  console.log("Front End Server listening on port " + PORT);
});