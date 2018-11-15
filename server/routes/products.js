"use strict";

const express = require('express');
const router = express.Router();
const {
  getIndividual,
  getAll
} = require('../db/methods/product_interface');
const restaurantNumber = '14165222220';

module.exports = (() => {

  router.get("/", (req, res) => {
    res.json(JSON.stringify(getAll()));
  });
  router.get('/:product_id', (req, res) => {
    const productInfo = getIndividual(req.params.product_id);
    res.json(JSON.stringify(productInfo));
  });
  return router;
})();
