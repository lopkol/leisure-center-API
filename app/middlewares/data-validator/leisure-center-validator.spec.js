'use strict';

const express = require('express');
const request = require('supertest');
const leisureCenterValidator = require('./leisure-center-validator');

describe('auth middleware', () => {
  const testApp = express();
  testApp.use(express.json());
  let requestObject;
  testApp.get('/test-endpoint', leisureCenterValidator, (req, res) => {
    requestObject = req;
    res.sendStatus(200);
  });

  async function callEndpointWithLeisureCenterValidator({ leisureCenter = {}, expectedStatus = 200 }) {
    const response = await request(testApp.listen())
      .get('/test-endpoint')
      .send(leisureCenter)
      .expect(expectedStatus);

    return { request: requestObject, response };
  }

  it('responds with 400 if called with no data to save', async () => {
    await callEndpointWithLeisureCenterValidator({ expectedStatus: 400 });
  });

  it('responds with 400 if called with invalid properties', async () => {
    const leisureCenter = {
      name: 'some name',
      address: 'some address',
      description: 'blah',
      age: '34'
    };
    await callEndpointWithLeisureCenterValidator({ leisureCenter, expectedStatus: 400 });
  });

  it('calls through to endpoint if the data is valid', async () => {
    const leisureCenter = {
      name: 'some name',
      address: 'some address',
      link: 'some link',
      activity: 'snowboarding'
    };
    await callEndpointWithLeisureCenterValidator({ leisureCenter, expectedStatus: 200 });
  });
});
