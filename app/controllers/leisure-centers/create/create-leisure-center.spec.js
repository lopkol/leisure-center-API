'use strict';

const request = require('supertest');
const { omit } = require('lodash');
const app = require('../../../app');
const db = require('../../../services/db');

const { getAllLeisureCenters } = require('../../../services/db-leisure-centers');
const { generateLeisureCenter } = require('../../../../test/test-helpers');
const { apiKeys } = require('../../../../config/config');
const validApiKey = apiKeys[0];
const authorizationHeader = `Bearer ${validApiKey}`;

describe('POST /leisure-centers', () => {
  beforeEach(async () => {
    await db('leisure_centers').truncate();
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

  it('creates a leisure center with the correct properties', async () => {
    const leisureCenter = generateLeisureCenter();

    await request(app.listen())
      .post('/leisure-centers')
      .set('authorization', authorizationHeader)
      .send({ leisureCenter })
      .expect(201);
    
    const result = await getAllLeisureCenters();
    expect(result.length).toBe(1);

    const savedLeisureCenter = omit(result[0], 'id');
    expect(savedLeisureCenter).toEqual(leisureCenter);
  });

  it('returns 201 and the leisure center data, including id', async () => {
    const leisureCenter = generateLeisureCenter();

    const res = await request(app.listen())
      .post('/leisure-centers')
      .set('authorization', authorizationHeader)
      .send({ leisureCenter })
      .expect(201);
    
    const returnedData = res.body.leisureCenter;
    expect(returnedData.hasOwnProperty('id')).toBe(true);

    const savedLeisureCenterData = omit(returnedData, 'id');
    expect(savedLeisureCenterData).toEqual(leisureCenter);
  });
});
