"use strict";

const express = require("express");
const router = express.Router();
const {
  addNewOrder: add,
  getOrderDetails: getDetails,
  updateOrder: update
} = require("../db/methods/orders_interface");

// routes for orders
module.exports = (() => {
  router.get("/:id", (req, res) => {
    getDetails(req.params.id).then((resolve, reject) => {
      if (reject) throw reject;
      res.json(resolve);
    });
  });
  router.post("/", (req, res) => {
    req.on("data", e => {
      e = JSON.parse(e);
      const user_id = e.user_id;
      const options = e.options;
      add(user_id, options).then((resolve, reject) => {
        if (reject) throw reject;
        console.log(resolve);
        res.json({
          status: 200,
          added: true
        });
      });
    });
  });

  return router;
})();
