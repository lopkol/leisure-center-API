'use strict';

require('./env-loader');

module.exports = {
  apiKeys: JSON.parse(process.env.API_KEYS || '[]'),
  dbConnectionString: process.env.DATABASE_URL,
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
};
