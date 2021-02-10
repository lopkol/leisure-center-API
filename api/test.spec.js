'use strict';

const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('should return hello world', async () => {
    const res = await request(app.listen())
      .get('/')
      .expect(200);
    expect(res.text).toEqual('hello world');
  });
});
