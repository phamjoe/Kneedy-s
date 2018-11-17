"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 4040;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sass = require("node-sass-middleware");
const morgan = require('morgan');
const fetch = require('node-fetch');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userDB = require('./db');
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(require('cookie-parser')());
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

passport.use(new Strategy(
  function (username, password, cb) {
    userDB.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  userDB.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

//app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
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
app.get('/', (req, res) => {
  res.render('index', {
    user: req.user
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    user: req.user
  });
});

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }), (req, res) => {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get("/about", (req, res) => {

  res.render("about", {
    user: req.user
  });
});
app.get("/cart", (req, res) => {
  res.render("cart", {
    "cart": true,
    user: req.user
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
  res.render("checkout", {
    user: req.user,
    checkout: true
  });
});

app.post('/checkout', (req, res) => {
  loadCollection('sessionCart', function (col) {
    //show the users
    let data = col.data;
    let order = data.reduce((acc, el) => {
      acc += 'id: ' +
        el.id + ', quantity:' + el.quantity + ' ';
      console.log(acc);
      return acc;
    }, "");
    console.log(order);
    const url = ' https://kneedys-api.herokuapp.com/text';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify([{
        "number": "2267007741",
        "message": "Youve placed an order, please wait, the restaurant will send you the eta."
      }, {
        "number": "4165222220",
        "message": req.body.fname + ', ' + req.body.lname + " Has placed order, " + order + ", Send eta:"
      }])
    }).then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
    db.saveDatabase();
  });
  loadCollection('sessionCart', function (col) {
    col.chain().find({}).remove()
    db.saveDatabase(function (err) {
      res.redirect('/');
    });
  });
});


app.get("/contact", (req, res) => {
  res.render("contact", {
    user: req.user
  });
});
app.get("/order", (req, res) => {
  const url = ' https://kneedys-api.herokuapp.com/products';
  fetch(url, {
    method: 'GET',
  }).then((response) => {
    response.body.on('data', (e) => {
      let productDatabase = JSON.parse(e);
      let templateVars = {
        product: productDatabase,
        user: req.user
      };
      res.render("order", templateVars);
    });
  }).catch(err => {
    console.log(err);
  });
});

app.get("/order-received", (req, res) => {
  res.render("order-received", {
    user: req.user,
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