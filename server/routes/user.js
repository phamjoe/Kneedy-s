"use strict";
const {
  addNewUser: add,
  getAllPastOrders: getPast,
  getUserInfo: getInfo,
  verifyUser: verify
} = require("../db/methods/user_interface.js");
const express = require("express");
const router = express.Router();

module.exports = (() => {
  router.get("/:id", (req, res) => {
    getInfo(req.params.id).then((resolve, reject) => {
      if (reject) throw reject;
      res.json(resolve)
    });
  });
  router.put("/:id", (req, res) => {
    res.status(200);
  });

  router.get("/:id/orders", (req, res) => {
    getPast(req.params.id).then((resolve, reject) => {
      if (reject) throw reject;
      res.json(resolve);
    })

  });
  return router;
})();
