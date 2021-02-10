'use strict';

//const path = require('path');
const config = require('./api/config');

module.exports = {
  client: 'pg',
  connection: config.db.connectionString,
  pool: {
    min: 2,
    max: 10
  }
};
