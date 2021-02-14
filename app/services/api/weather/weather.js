'use strict';

const axios = require('axios');
const { openWeather } = require('../../../../config/config');
const querystring = require('querystring');

module.exports = async coordinates => {
  if (!coordinates || !coordinates.hasOwnProperty('longitude') || !coordinates.hasOwnProperty('latitude')) {
    return undefined;
  }

  const { latitude, longitude } = coordinates;

  if ([null, '', undefined].includes(longitude) || [null, '', undefined].includes(latitude)) {
    return undefined;
  }
  const queryParams = querystring.stringify({ lat: latitude, lon: longitude });

  const apiUrl = `${openWeather.url}${openWeather.path}?${queryParams}&${openWeather.queryParams}`;

  try {
    const res = await axios.get(apiUrl);
    return res.data;

  } catch (err) {
    return null;
  }
};
