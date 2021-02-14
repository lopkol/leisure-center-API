'use strict';

const { getPaginatedLeisureCentersByActivity } = require('../../../services/db/db-leisure-centers');
const getWeather = require('../../../services/api/weather/weather');


module.exports = async (req, res) => {
  const activity = req.query.activity || undefined;
  const limit = req.query.limit || undefined;
  const offset = req.query.offset || 0;

  const leisureCentersWithoutWeather = await getPaginatedLeisureCentersByActivity({ activity, offset, limit });

  const leisureCentersWithWeather = await Promise.all(leisureCentersWithoutWeather.map(async leisureCenter => {
    const weather = await getWeather(leisureCenter.coordinates);
    switch (weather) {
      case null:
        return {
          ...leisureCenter,
          weather: 'no available weather data at given location'
        };
      case undefined:
        return {
          ...leisureCenter,
          weather: 'location not recognized'
        };
      default:
        return {
          ...leisureCenter,
          weather
        };
    }
  }));

  // TODO IDEAS: 
  // could call geocoding api for those ones where we have no coordinates
  // cache weather, so no need to call weather api so often

  return res.status(200).send({ leisureCenters: leisureCentersWithWeather });
};
