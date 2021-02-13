'use strict';

const geocode = require('./geocoding');
const nock = require('nock');
const querystring = require('querystring');
const { mapbox } = require('../../../../config/config');

const { mapboxTestAddress, mapboxTestCoordinates, mapboxTestResponse } = require('../../../../test/geocoding-api-test-data');

const reqParam = `${querystring.escape(mapboxTestAddress)}.json`;

describe('geocoding API', () => {
  it('returns null for longitude and latitude in case of error', async () => {
    nock(mapbox.apiUrl)
      .get(`/${reqParam}?${mapbox.queryStr}`)
      .reply(404);

    const nullCoordinates = {
      longitude: null,
      latitude: null
    };
    const result = await geocode(mapboxTestAddress);
    expect(result).toEqual(nullCoordinates);
  });

  it('returns an object with correct longitude and latitude', async () => {
    nock(mapbox.apiUrl)
      .get(`/${reqParam}?${mapbox.queryStr}`)
      .reply(200, mapboxTestResponse);

    const result = await geocode(mapboxTestAddress);
    expect(result).toEqual(mapboxTestCoordinates);
  });
});

