'use strict';

const { apiKeys } = require('../../../config/config');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization || '';
  const apiKey = authorizationHeader.replace(/^Bearer /, '');

  if (!authorizationHeader.startsWith('Bearer') || !apiKey) {
    return res.sendStatus(401);
  }

  if (!apiKeys.includes(apiKey)) {
    return res.status(401).send({ reason: 'invalid_api_key' });
  }

  req.apiKey = apiKey;
  next();
};
