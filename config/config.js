'use strict';

require('./env-loader');
const querystring = require('querystring');

const mapboxQueryStr = querystring.stringify({
  limit: 1,
  access_token: process.env.MAPBOX_API_KEY
});

module.exports = {
  apiKeys: JSON.parse(process.env.API_KEYS || '[]'),
  dbConnectionString: process.env.DATABASE_URL,
  environment: process.env.NODE_ENV,
  mapbox: {
    apiUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    queryStr: mapboxQueryStr
  },
  port: process.env.PORT,
};
