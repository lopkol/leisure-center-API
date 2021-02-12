'use strict';

const { isEmpty } = require('lodash');
const properties = ['name', 'description', 'address', 'link', 'activity'];

module.exports = (req, res, next) => {
  const leisureCenter = req.body.leisureCenter || {};

  if (isEmpty(leisureCenter)) {
    return res.status(400).send({ reason: 'no_data' });
  }

  const propsOfLeisureCenter = Object.keys(leisureCenter);
  const hasInvalidProperties = !propsOfLeisureCenter.every(key => properties.includes(key));
  if (hasInvalidProperties) {
    return res.status(400).send({ reason: 'invalid_data' });
  }

  next();
};
