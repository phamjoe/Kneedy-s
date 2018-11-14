"use strict";
const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
//const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


app.use(bodyParser.urlencoded({
  extended: true
}));
// Mount all resource routes
app.use("/user", usersRoutes);
app.use("/products", productRoutes);
// Home page
app.get("/", (req, res) => {
  res.json({
    status: 200,
    ready: true
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
