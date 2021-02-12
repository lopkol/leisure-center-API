'use strict';

const { getActivities } = require('../../services/db-leisure-centers');

module.exports = async (req, res) => {
  const activities = await getActivities();

  return res.status(200).send({ activities });
};
