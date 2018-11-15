"use strict";

const express = require('express');
const router = express.Router();
const {
  getSpecificProduct: getIndividual,
  getAllProducts: getAll
} = require('../db/methods/product_interface');
const restaurantNumber = '14165222220';

module.exports = (() => {

  router.get("/", (req, res) => {
    getAll().then((resolve, reject) => {
      if (reject) throw reject;
      res.json(resolve);
    })

  });
  router.get('/:product_id', (req, res) => {
    getIndividual(req.params.product_id).then((resolve, reject) => {
      if (reject) throw reject;
      res.json(resolve);
    });

  });
  return router;
})();
