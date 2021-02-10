'use strict';

require('./env-loader');

module.exports = {
  port: process.env.PORT,
  db: {
    connectionString: process.env.DATABASE_URL,
  },
  environment: process.env.NODE_ENV
};
