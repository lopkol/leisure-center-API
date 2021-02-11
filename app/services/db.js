'use strict';

const knex = require('knex');
const config = require('../../config/config');

module.exports = knex({
  client: 'pg',
  connection: config.db.connectionString,
});
