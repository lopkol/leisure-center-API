'use strict';

const request = require('supertest');
const querystring = require('querystring');
const nock = require('nock');
const { omit } = require('lodash');
const app = require('../../../app');
const db = require('../../../services/db/db');

const { apiKeys, openWeather } = require('../../../../config/config');
const { createLeisureCenter } = require('../../../services/db/db-leisure-centers');
const { generateLeisureCenter } = require('../../../../test/test-helpers');
const { openWeatherTestCoordinates, openWeatherTestResponse } = require('../../../../test/weather-api-test-data');

const validApiKey = apiKeys[0];
const authorizationHeader = `Bearer ${validApiKey}`;

const missingCoordinates = {
  latitude: 0
};
const badCoordinates = {
  longitude: 99,
  latitude: 99
};

const goodQueryParams = querystring.stringify({ 
  lat: openWeatherTestCoordinates.latitude, 
  lon: openWeatherTestCoordinates.longitude 
});
const goodQuery = `${openWeather.path}?${goodQueryParams}&${openWeather.queryParams}`;

const badQueryParams = querystring.stringify({ 
  lat: badCoordinates.latitude, 
  lon: badCoordinates.longitude 
});
const badQuery = `${openWeather.path}?${badQueryParams}&${openWeather.queryParams}`;

describe('GET /leisure-centers', () => {
  beforeEach(async () => {
    await db('leisure_centers').truncate();

    nock(openWeather.url)
      .persist()
      .get(goodQuery)
      .reply(200, openWeatherTestResponse);

    nock(openWeather.url)
      .persist()
      .get(badQuery)
      .reply(404);
  });

  afterEach(async () => {
    nock.cleanAll();
  });

  it('responds with 401 if called without valid api key', async () => {
    await request(app.listen())
      .get('/leisure-centers')
      .expect(401);
  });

  
  it('does not filter activities if called without activity', async () => {
    const activityList = ['hiking', 'climbing', 'canoeing', 'wakeboarding'];
    const leisureCentersData = activityList.map(activity => {
      const leisureCenter = generateLeisureCenter({ activity });
      return {
        ...leisureCenter,
        coordinates: openWeatherTestCoordinates
      };
    });

    await Promise.all(leisureCentersData.map(async data => {
      await createLeisureCenter(data);
    }));

    const res = await request(app.listen())
      .get('/leisure-centers')
      .set('authorization', authorizationHeader)
      .expect(200);

    const receivedData = res.body.map(leisureCenter => omit(leisureCenter, 'id'));

    const expectedData = leisureCentersData.map(leisureCenter => ({
      ...leisureCenter,
      weather: openWeatherTestResponse
    }));

    expect(receivedData).toEqual(jasmine.arrayWithExactContents(expectedData));
  });

  it('filters activities', async () => {
    const activityList = ['hiking', 'wakeboarding', 'climbing', 'canoeing', 'wakeboarding'];
    const leisureCentersData = activityList.map(activity => {
      const leisureCenter = generateLeisureCenter({ activity });
      return {
        ...leisureCenter,
        coordinates: openWeatherTestCoordinates
      };
    });

    await Promise.all(leisureCentersData.map(async data => {
      await createLeisureCenter(data);
    }));

    const res = await request(app.listen())
      .get('/leisure-centers?limit=6&offset=0&activity=wakeboarding')
      .set('authorization', authorizationHeader)
      .expect(200);

    expect(res.body.length).toBe(2);
  });

  it('returns no weather in case of no weather data', async () => {
    const leisureCenterData = generateLeisureCenter();
    const leisureCenter = {
      ...leisureCenterData,
      coordinates: badCoordinates
    };
    
    await createLeisureCenter(leisureCenter);

    const res = await request(app.listen())
      .get('/leisure-centers?limit=6')
      .set('authorization', authorizationHeader)
      .expect(200);

    const returnedData = omit(res.body[0], 'id');

    expect(returnedData).toEqual(leisureCenter);
  });

  it('returns no weather in case of no location data', async () => {
    const leisureCenterData = generateLeisureCenter();
    const leisureCenter = {
      ...leisureCenterData,
      coordinates: missingCoordinates
    };
    
    await createLeisureCenter(leisureCenter);

    const res = await request(app.listen())
      .get('/leisure-centers?limit=6')
      .set('authorization', authorizationHeader)
      .expect(200);

    const returnedData = omit(res.body[0], 'id');

    expect(returnedData).toEqual(leisureCenter);
  });
});
