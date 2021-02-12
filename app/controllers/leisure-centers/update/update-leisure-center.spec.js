'use strict';

const request = require('supertest');
const app = require('../../../app');
const db = require('../../../services/db');

const { createLeisureCenter } = require('../../../services/db-leisure-centers');
const { generateLeisureCenter } = require('../../../../test/test-helpers');
const { apiKeys } = require('../../../../config/config');
const validApiKey = apiKeys[0];
const authorizationHeader = `Bearer ${validApiKey}`;

describe('PATCH /leisure-centers/:id', () => {
  beforeEach(async () => {
    await db('leisure_centers').truncate();
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
    const leisureCenter = generateLeisureCenter();
    const { id } = await createLeisureCenter(leisureCenter);

    const dataToUpdate = { address: 'new address' };

    const res = await request(app.listen())
      .patch(`/leisure-centers/${id}`)
      .set('authorization', authorizationHeader)
      .send({ leisureCenter: dataToUpdate })
      .expect(200);
    
    const returnedData = res.body.leisureCenter;
    const expectedData = {
      id,
      ...leisureCenter,
      ...dataToUpdate
    };
    expect(returnedData).toEqual(expectedData);
  });
});
