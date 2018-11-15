const knexConfig = require("../../knexfile");
const ENV = process.env.ENVIRONMENT || 'development';
const knex = require("knex")(knexConfig[ENV]);


module.exports = knex;
