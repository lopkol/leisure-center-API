'use strict';

require('./env-loader');
const querystring = require('querystring');

const mapboxQueryStr = querystring.stringify({
  limit: 1,
  access_token: process.env.MAPBOX_API_KEY
});

const openWeatherQueryParams = querystring.stringify({
  exclude: 'minutely,hourly,daily,alerts',
  units: 'metric',
  appid: process.env.OPENWEATHER_API_KEY
});

module.exports = {
  apiKeys: JSON.parse(process.env.API_KEYS || '[]'),
  dbConnectionString: process.env.DATABASE_URL,
  environment: process.env.NODE_ENV,
  mapbox: {
    url: 'https://api.mapbox.com',
    path: '/geocoding/v5/mapbox.places',
    queryStr: mapboxQueryStr
  },
  openWeather: {
    url: 'https://api.openweathermap.org',
    path: '/data/2.5/onecall',
    queryParams: openWeatherQueryParams
  },
  port: process.env.PORT,
};
