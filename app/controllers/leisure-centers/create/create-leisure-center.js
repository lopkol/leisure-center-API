'use strict';

const { createLeisureCenter } = require('../../../services/db/db-leisure-centers');

module.exports = async (req, res) => {
  const leisureCenter = req.body.leisureCenter;

  const savedLeisureCenter = await createLeisureCenter(leisureCenter);
  return res.status(201).send({ leisureCenter: savedLeisureCenter });
};
