'use strict';

const { createLeisureCenter } = require('../../../services/db-leisure-centers');

module.exports = async (req, res) => {
  const leisureCenter = req.body.leisureCenter;

  const savedLeisureCenter = await createLeisureCenter(leisureCenter);
  res.status(201).send({ leisureCenter: savedLeisureCenter });
};
