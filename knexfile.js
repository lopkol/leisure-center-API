'use strict';

const path = require('path');
const config = require('./config/config');

module.exports = {
  client: 'pg',
  connection: config.db.connectionString,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: path.join(__dirname, 'database/migrations'),
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.join(__dirname, 'database/seeds')
  }
};
