'use strict';

const { updateLeisureCenter } = require('../../../services/db-leisure-centers');

module.exports = async (req, res) => {
  const id = req.params.id;
  const leisureCenter = req.body.leisureCenter;

  const savedLeisureCenter = await updateLeisureCenter(id, leisureCenter);

  if (savedLeisureCenter === null) {
    return res.sendStatus(404);
  }
  res.status(200).send({ leisureCenter: savedLeisureCenter });
};
