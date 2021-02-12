'use strict';

const { deleteLeisureCenter } = require('../../../services/db-leisure-centers');

module.exports = async (req, res) => {
  const id = req.params.id;

  const result = await deleteLeisureCenter(id);

  if (result === null) {
    return res.sendStatus(404);
  }
  return res.sendStatus(204);
};
