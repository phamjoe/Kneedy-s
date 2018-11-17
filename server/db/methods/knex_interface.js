const knexConfig = require("../../knexfile");
const ENV = process.env.ENVIRONMENT || 'development';
const knex = require("knex")(knexConfig[ENV]);

// Expose knex to all the files that require it
module.exports = knex;
