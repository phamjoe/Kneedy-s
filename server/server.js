"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');


// Seperated Routes for each Resource
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const orderRoutes = require('./routes/order');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());
// Mount all resource routes
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use('/order', orderRoutes);
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
