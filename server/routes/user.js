"use strict";
const {
  add,
  getPast,
  getInfo,
  verify
} = require("./db/methods/user_interface.js");
const express = require("express");
const router = express.Router();

module.exports = (() => {
  router.get("/:id", (req, res) => {
    res.json(JSON.stringify(getInfo(req.params.id)));
  });
  router.put("/:id", (req, res) => {
    res.status(200);
  });

  router.get("/:id/orders", (req, res) => {
    res.json(JSON.stringify(getPast(req.params.id)));
  });
  return router;
})();
