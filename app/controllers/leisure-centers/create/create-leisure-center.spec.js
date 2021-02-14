'use strict';

const request = require('supertest');
const nock = require('nock');
const { omit } = require('lodash');
const app = require('../../../app');
const db = require('../../../services/db/db');

const { mapbox, apiKeys } = require('../../../../config/config');
const { getAllLeisureCenters } = require('../../../services/db/db-leisure-centers');
const { generateLeisureCenter } = require('../../../../test/test-helpers');
const { mapboxTestCoordinates, mapboxTestResponse } = require('../../../../test/geocoding-api-test-data');

const validApiKey = apiKeys[0];
const authorizationHeader = `Bearer ${validApiKey}`;

const address = 'Budapest';
const reqParam = `${address}.json`;

describe('POST /leisure-centers', () => {
  beforeEach(async () => {
    await db('leisure_centers').truncate();
    nock(mapbox.url)
      .get(`${mapbox.path}/${reqParam}?${mapbox.queryStr}`)
      .reply(200, mapboxTestResponse);
  });

  afterEach(async () => {
    nock.cleanAll();
  });

  it('responds with 401 if called without valid api key', async () => {
    await request(app.listen())
      .post('/leisure-centers')
      .expect(401);
  });

  it('responds with 400 if the data is not valid', async () => {
    await request(app.listen())
      .post('/leisure-centers')
      .set('authorization', authorizationHeader)
      .send({ 
        leisureCenter: {
          name: 'some name',
          unicorn: 'happy unicorn'
        }
      })
      .expect(400);
  });

  it('responds with 400 if some data is missing', async () => {
    const res = await request(app.listen())
      .post('/leisure-centers')
      .set('authorization', authorizationHeader)
      .send({ 
        leisureCenter: {
          name: 'unicorn',
          address
        }
      })
      .expect(400);

    expect(res.body.reason).toEqual('missing_data');
  });

  it('creates a leisure center with the correct properties, adds coordinates', async () => {
    const leisureCenter = generateLeisureCenter({ address });

    await request(app.listen())
      .post('/leisure-centers')
      .set('authorization', authorizationHeader)
      .send({ leisureCenter })
      .expect(201);
    
    const result = await getAllLeisureCenters();
    expect(result.length).toBe(1);

    const savedLeisureCenter = omit(result[0], 'id');
    const leisureCenterWithCoordinates = {
      ...leisureCenter,
      coordinates: mapboxTestCoordinates
    };

    expect(savedLeisureCenter).toEqual(leisureCenterWithCoordinates);
  });

  it('returns 201 and the leisure center data, including id and coordinates', async () => {
    const leisureCenter = generateLeisureCenter({ address });

    const res = await request(app.listen())
      .post('/leisure-centers')
      .set('authorization', authorizationHeader)
      .send({ leisureCenter })
      .expect(201);
    
    const returnedData = res.body.leisureCenter;
    expect(returnedData.hasOwnProperty('id')).toBe(true);

    const savedLeisureCenterData = omit(returnedData, 'id');
    const leisureCenterWithCoordinates = {
      ...leisureCenter,
      coordinates: mapboxTestCoordinates
    };

    expect(savedLeisureCenterData).toEqual(leisureCenterWithCoordinates);
  });
});
