'use strict';

require('./env-loader');

module.exports = {
  apiKeys: JSON.parse(process.env.API_KEYS || '[]'),
  dbConnectionString: process.env.DATABASE_URL,
  environment: process.env.NODE_ENV,
  mapbox: {
    apiUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    apiKey: process.env.MAPBOX_API_KEY
  },
  port: process.env.PORT,
};
