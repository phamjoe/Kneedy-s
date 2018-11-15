"use strict";

const express = require('express');
const router = express.Router();


module.exports = (() => {
  router.get('/', (req, res) => {

  });
  router.post('/', (req, res) => {
    const user_id = req.data.user_id;
    const options = JSON.parse(req.data.options);
  });

  return router;
})();
