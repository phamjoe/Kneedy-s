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
const db = require('./db');
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(require('cookie-parser')());

//const knexLogger  = require('knex-logger');

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
  

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
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
app.get('/', (req, res) => {
    res.render('index', { user: req.user });
  });

app.get('/login',(req, res) => {
    res.render('login',{ user: req.user });
  });

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),(req, res) => {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

app.get("/about", (req, res) => {
  
  res.render("about", { user: req.user });
});
app.get("/cart", (req, res) => {
  res.render("cart", {
    "cart": true,
    user : req.user
  });
});
app.get("/checkout", (req, res) => {
  res.render("checkout", { user: req.user });
});
app.get("/contact", (req, res) => {
  res.render("contact", { user: req.user });
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
        user : req.user
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