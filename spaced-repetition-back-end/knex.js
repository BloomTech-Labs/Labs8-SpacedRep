const environment = process.env.ENVIRONMENT || 'development';
// const environment = process.env.ENVIRONMENT || 'production';
const config = require('./knexfile.js')[environment];
module.exports = require('knex')(config);
