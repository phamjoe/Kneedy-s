"use strict";

const express = require('express');
const router = express.Router();
const controller = require("./controllers/product_controller");

module.exports = (() => {

  router.get("/", (req, res) => {

  });

  return router;
})();
