'use strict';

const axios = require('axios');
const { mapbox } = require('../../../../config/config');
const querystring = require('querystring');

module.exports = async address => {
  const reqParam = `${querystring.escape(address)}.json`;

  const apiUrl = `${mapbox.url}${mapbox.path}/${reqParam}?${mapbox.queryStr}`;
  let longitude, latitude;
  try {
    const res = await axios.get(apiUrl);
    [longitude, latitude] = res.data.features[0].geometry.coordinates;
  } catch (err) {
    //TODO: error handling
    return {
      longitude: null,
      latitude: null
    };
  }
  return {
    longitude,
    latitude
  };
};
