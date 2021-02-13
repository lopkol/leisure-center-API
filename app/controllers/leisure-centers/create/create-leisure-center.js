'use strict';

const { createLeisureCenter } = require('../../../services/db/db-leisure-centers');
const geocode = require('../../../services/api/geocoding/geocoding');
const properties = ['name', 'description', 'address', 'link', 'activity'];

module.exports = async (req, res) => {
  const leisureCenter = req.body.leisureCenter;

  const propsOfLeisureCenter = Object.keys(leisureCenter);
  const hasMissingProperties = !properties.every(key => propsOfLeisureCenter.includes(key));
  if (hasMissingProperties) {
    return res.status(400).send({ reason: 'missing_data' });
  }

  const coordinates = await geocode(leisureCenter.address);
  const leisureCenterWithCoordinates = {
    ...leisureCenter,
    coordinates
  };

  const savedLeisureCenter = await createLeisureCenter(leisureCenterWithCoordinates);
  return res.status(201).send({ leisureCenter: savedLeisureCenter });
};
