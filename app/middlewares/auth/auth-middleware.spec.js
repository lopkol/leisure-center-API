'use strict';

const express = require('express');
const request = require('supertest');
const authMiddleware = require('./auth-middleware');
const { apiKeys } = require('../../../config/config');

describe('auth middleware', () => {
  const testApp = express();
  let requestObject;
  testApp.get('/test-endpoint', authMiddleware, (req, res) => {
    requestObject = req;
    res.sendStatus(200);
  });

  async function callEndpointWithAuthMiddleware({ authorizationHeader = '', expectedStatus = 200 }) {
    const response = await request(testApp.listen())
      .get('/test-endpoint')
      .set('authorization', authorizationHeader)
      .expect(expectedStatus);

    return { request: requestObject, response };
  }

  it('responds with 401 if called without authorization header', async () => {
    await callEndpointWithAuthMiddleware({ expectedStatus: 401 });
  });

  it('responds with 401 when called with an autorization header of invalid format', async () =>{
    await callEndpointWithAuthMiddleware({ authorizationHeader: 'some invalid header', expectedStatus: 401 });
  });

  it('responds with 401 if called with invalid api key', async () => {
    const { response } = await callEndpointWithAuthMiddleware({ authorizationHeader: 'Bearer some_invalid_api_key', expectedStatus: 401 });
    expect(response.body.reason).toEqual('invalid_api_key');
  });

  it('calls through to endpoint if api key is valid', async () => {
    const validApiKey = apiKeys[0];

    await callEndpointWithAuthMiddleware({ authorizationHeader: `Bearer ${validApiKey}`, expectedStatus: 200 });
  });

  it('decorates api key to request object if it is valid', async () => {
    const validApiKey = apiKeys[0];

    const { request } = await callEndpointWithAuthMiddleware({ authorizationHeader: `Bearer ${validApiKey}` });

    expect(request.apiKey).toEqual(validApiKey);
  });
});
