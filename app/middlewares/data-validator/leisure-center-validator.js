'use strict';

const { isEmpty } = require('lodash');
const properties = ['name', 'description', 'address', 'link', 'activity'];

module.exports = (req, res, next) => {
  const leisureCenter = req.body || {};

  if (isEmpty(leisureCenter)) {
    return res.sendStatus(400);
  }

  const propsOfLeisureCenter = Object.keys(leisureCenter);
  const hasInvalidProperties = !propsOfLeisureCenter.every(key => properties.includes(key));
  if (hasInvalidProperties) {
    return res.sendStatus(400);
  }

  next();
};
