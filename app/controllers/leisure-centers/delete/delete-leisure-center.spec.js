'use strict';

const request = require('supertest');
const app = require('../../../app');
const db = require('../../../services/db');

const { createLeisureCenter, getLeisureCenterById } = require('../../../services/db-leisure-centers');

const { generateLeisureCenter } = require('../../../../test/test-helpers');
const { apiKeys } = require('../../../../config/config');
const validApiKey = apiKeys[0];
const authorizationHeader = `Bearer ${validApiKey}`;

describe('DELETE /leisure-centers/:id', () => {
  beforeEach(async () => {
    await db('leisure_centers').truncate();
  });

  it('responds with 401 if called without valid api key', async () => {
    const id = 6;
    await request(app.listen())
      .delete(`/leisure-centers/${id}`)
      .expect(401);
  });

  it('responds with 404 if the id does not exist', async () => {
    const id = 6;
    await request(app.listen())
      .delete(`/leisure-centers/${id}`)
      .set('authorization', authorizationHeader)
      .expect(404);
  });

  it('responds with 204 and deletes the leisure center if the id exists', async () => {
    const leisureCenter = generateLeisureCenter();
    const { id } = await createLeisureCenter(leisureCenter);

    await request(app.listen())
      .delete(`/leisure-centers/${id}`)
      .set('authorization', authorizationHeader)
      .expect(204);

    const result = await getLeisureCenterById(id);
    expect(result).toBe(null);
  });
});
