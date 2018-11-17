"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 4040;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sass = require("node-sass-middleware");
//const morgan = require('morgan');
const fetch = require('node-fetch');
var loki = require('lokijs'),
  db = new loki('quickstart.db');

function loadCollection(colName, callback) {
  db.loadDatabase({}, function () {
    var _collection = db.getCollection(colName);
    if (!_collection) {
      console.log("Collection %s does not exist. Creating ...", colName);
      _collection = db.addCollection('sessionCart');
    }
    callback(_collection);
  });
}
//app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: false,
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
    "cart": true,
  });
});

app.get('/local', (req, res) => {
  loadCollection('sessionCart', function (col) {
    //show the users
    res.json(col.data);
    db.saveDatabase();
  });
})
app.post('/local/delete', (req, res) => {
  loadCollection('sessionCart', function (col) {
    let search = req.body.search;
    console.log(search);
    //show the users
    col.findAndRemove({
      'name': {
        '$eq': search
      }
    });
    db.saveDatabase();
  });
  res.end();
})

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

app.post('/cart', (req, res) => {
  let items = req.body.response[0];
  console.log(items);
  loadCollection('sessionCart', function (col) {
    let found = false;
    col.findAndUpdate({
      'name': {
        '$eq': items.name
      }
    }, (el) => {
      found = true;
      el = el.quantity++;
    });
    if (found === false) {
      col.insert(items);
    }
    //save 
    db.saveDatabase();
  });
  res.end();
});

app.listen(PORT, () => {
  console.log("Front End Server listening on port " + PORT);
});