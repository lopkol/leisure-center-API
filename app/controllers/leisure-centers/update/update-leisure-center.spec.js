'use strict';

const request = require('supertest');
const nock = require('nock');
const app = require('../../../app');
const db = require('../../../services/db/db');

const { mapbox, apiKeys } = require('../../../../config/config');
const { createLeisureCenter } = require('../../../services/db/db-leisure-centers');
const { generateLeisureCenterWithCoordinates } = require('../../../../test/test-helpers');
const { mapboxTestCoordinates, mapboxTestResponse } = require('../../../../test/geocoding-api-test-data');

const validApiKey = apiKeys[0];
const authorizationHeader = `Bearer ${validApiKey}`;

const address = 'Budapest';
const reqParam = `${address}.json`;

describe('PATCH /leisure-centers/:id', () => {
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
    const id = 6;
    await request(app.listen())
      .patch(`/leisure-centers/${id}`)
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

  it('responds with 404 if the id does not exist', async () => {
    const id = 6;
    const leisureCenter = { name: 'some name' };
    await request(app.listen())
      .patch(`/leisure-centers/${id}`)
      .set('authorization', authorizationHeader)
      .send({ leisureCenter })
      .expect(404);
  });

  it('returns 200 and the correctly updated leisure center data', async () => {
    const leisureCenter = generateLeisureCenterWithCoordinates();
    const { id } = await createLeisureCenter(leisureCenter);

    const dataToUpdate = { description: 'very awesome', link: 'some new link' };

    const res = await request(app.listen())
      .patch(`/leisure-centers/${id}`)
      .set('authorization', authorizationHeader)
      .send({ leisureCenter: dataToUpdate })
      .expect(200);
    
    const returnedData = res.body;
    const expectedData = {
      id,
      ...leisureCenter,
      ...dataToUpdate
    };
    expect(returnedData).toEqual(expectedData);
  });

  it('updates the coordinates if the address changes', async () => {
    const leisureCenter = generateLeisureCenterWithCoordinates();
    const { id } = await createLeisureCenter(leisureCenter);

    const dataToUpdate = { address };

    const res = await request(app.listen())
      .patch(`/leisure-centers/${id}`)
      .set('authorization', authorizationHeader)
      .send({ leisureCenter: dataToUpdate })
      .expect(200);
    
    const returnedData = res.body;
    const expectedData = {
      id,
      ...leisureCenter,
      ...dataToUpdate,
      coordinates: mapboxTestCoordinates
    };
    expect(returnedData).toEqual(expectedData);
  });
});
