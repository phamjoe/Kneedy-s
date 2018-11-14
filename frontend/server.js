"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 4040;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
//const knexLogger  = require('knex-logger');


app.use(morgan('dev'));

app.set('view engine', 'ejs');

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