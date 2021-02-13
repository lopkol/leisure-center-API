'use strict';

const openWeatherTestCoordinates = {
  longitude: 0,
  latitude: 0
};

const openWeatherTestResponse = {
  'lat': 0,
  'lon':0,
  'timezone':'Etc/GMT',
  'timezone_offset':0,
  'current': {
    'dt':1613225534,
    'sunrise':1613196654,
    'sunset':1613240264,
    'temp':300.51,
    'feels_like':300.81,
    'pressure':1008,
    'humidity':80,
    'dew_point':296.75,
    'uvi':9.52,
    'clouds':60,
    'visibility':10000,
    'wind_speed':7.55,
    'wind_deg':204,
    'weather': [
      {
        'id':803,
        'main':'Clouds',
        'description':'broken clouds',
        'icon':'04d'
      }
    ]
  }
};

module.exports = {
  openWeatherTestCoordinates,
  openWeatherTestResponse
};
