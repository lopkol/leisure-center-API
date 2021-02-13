'use strict';

const { updateLeisureCenter } = require('../../../services/db/db-leisure-centers');
const geocode = require('../../../services/api/geocoding/geocoding');

module.exports = async (req, res) => {
  const id = req.params.id;
  const leisureCenter = req.body.leisureCenter;

  let leisureCenterWithCoordinates = leisureCenter;
  if (leisureCenter.hasOwnProperty('address')) {
    const coordinates = await geocode(leisureCenter.address);
    leisureCenterWithCoordinates = {
      ...leisureCenter,
      coordinates
    };
  }

  const savedLeisureCenter = await updateLeisureCenter(id, leisureCenterWithCoordinates);

  if (savedLeisureCenter === null) {
    return res.sendStatus(404);
  }
  return res.status(200).send({ leisureCenter: savedLeisureCenter });
};
