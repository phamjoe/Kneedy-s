"use strict";

const express = require('express');
const router = express.Router();
const controller = require('./controllers/user_controller');

module.exports = (() => {

  router.get("/", (req, res) => {

  });

  return router;
})();
