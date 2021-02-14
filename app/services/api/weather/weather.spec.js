'use strict';

const getWeather = require('./weather');
const nock = require('nock');
const querystring = require('querystring');
const { openWeather } = require('../../../../config/config');

const { openWeatherTestCoordinates, openWeatherTestResponse } = require('../../../../test/weather-api-test-data');

const queryParams = querystring.stringify({ 
  lat: openWeatherTestCoordinates.latitude, 
  lon: openWeatherTestCoordinates.longitude 
});
const query = `${openWeather.path}?${queryParams}&${openWeather.queryParams}`;

describe('weather API', () => {
  it('returns undefined if latitude or longitude is missing', async () => {
    const wrongCoordinates = {
      latitude: null,
      longitude: 45
    };
    
    const res = await getWeather(wrongCoordinates);
    expect(res).toBe(undefined);
  });

  it('returns null in case of no response from API', async () => {
    nock(openWeather.url)
      .get(query)
      .reply(404);

    const res = await getWeather(openWeatherTestCoordinates);
    expect(res).toBe(null);
  });

  it('returns the current weather', async () => {
    nock(openWeather.url)
      .get(query)
      .reply(200, openWeatherTestResponse);

    const res = await getWeather(openWeatherTestCoordinates);
    expect(res).toEqual(openWeatherTestResponse);
  });
});
