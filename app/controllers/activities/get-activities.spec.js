'use strict';

const request = require('supertest');
const app = require('../../app');
const db = require('../../services/db/db');

const { createLeisureCenter } = require('../../services/db/db-leisure-centers');

const { randomItemFrom, generateLeisureCenter } = require('../../../test/test-helpers');
const { apiKeys } = require('../../../config/config');
const validApiKey = apiKeys[0];
const authorizationHeader = `Bearer ${validApiKey}`;

describe('GET /acivities', () => {
  beforeEach(async () => {
    await db('leisure_centers').truncate();
  });

  it('responds with 401 if called without valid api key', async () => {
    await request(app.listen())
      .get('/activities')
      .expect(401);
  });

  it('responds with 200 and returns the list of activities', async () => {
    const activityList = ['hiking', 'climbing', 'canoeing'];
    const activitesPerLeisureCenter = activityList.concat(Array(4)
      .fill(null)
      .map(() => randomItemFrom(activityList)));
    const leisureCentersData = activitesPerLeisureCenter.map(activity => generateLeisureCenter({ activity }));

    await Promise.all(leisureCentersData.map(async data => {
      await createLeisureCenter(data);
    }));

    const res = await request(app.listen())
      .get('/activities')
      .set('authorization', authorizationHeader)
      .expect(200);

    const returnedData = res.body;
    expect(returnedData).toEqual(jasmine.arrayWithExactContents(activityList));
  });
});
