'use strict';

const sort = require('immutable-sort');

function randomIntBetween(min, max) {
  return Math.floor((max - min + 1) * Math.random()) + min;
}
function randomItemFrom(array) {
  return array[randomIntBetween(0, array.length - 1)];
}
function randomString(length = 6) {
  return Math.random().toString(36).substr(2, length);
}

function sortByKey(arr, key) {
  return sort(arr, (a, b) => {
    return ((a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0));
  });
}

const possibleActivities = ['hiking', 'climbing', 'canoeing', 'via ferrata', 'wakeboarding', 'kitesurfing', 'cycling'];

function generateLeisureCenter(properties) {
  const name = randomString(randomIntBetween(6, 10));
  const description = randomString(randomIntBetween(15, 30));
  const address = randomString(randomIntBetween(13, 20));
  const link = randomString(randomIntBetween(12, 25));
  const activity = randomItemFrom(possibleActivities);
  return {
    name,
    description,
    address,
    link,
    activity,
    ...properties
  };
}

const mapboxTestAddress = '825 Milwaukee Ave, Deerfield, Illinois 60015, United States';
const mapboxTestCoordinates = {
  longitude: -87.921434,
  latitude: 42.166602
};

const mapboxMockResponse = {
  'type': 'FeatureCollection',
  'query': [
    '825',
    's',
    'milwaukee',
    'ave',
    'deerfield',
    'il',
    '60015'
  ],
  'features': [
    {
      'id': 'address.4356035406756260',
      'type': 'Feature',
      'place_type': [
        'address'
      ],
      'relevance': 1,
      'properties': {},
      'text': 'Milwaukee Ave',
      'place_name': '825 Milwaukee Ave, Deerfield, Illinois 60015, United States',
      'matching_text': 'South Milwaukee Avenue',
      'matching_place_name': '825 South Milwaukee Avenue, Deerfield, Illinois 60015, United States',
      'center': [
        -87.921434,
        42.166602
      ],
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -87.921434,
          42.166602
        ],
        'interpolated': true,
        'omitted': true
      },
      'address': '825',
      'context': [
        {
          'id': 'neighborhood.287187',
          'text': 'Lake Cook Road'
        },
        {
          'id': 'postcode.13903677306297990',
          'text': '60015'
        },
        {
          'id': 'place.5958304312090910',
          'wikidata': 'Q287895',
          'text': 'Deerfield'
        },
        {
          'id': 'region.3290978600358810',
          'short_code': 'US-IL',
          'wikidata': 'Q1204',
          'text': 'Illinois'
        },
        {
          'id': 'country.9053006287256050',
          'short_code': 'us',
          'wikidata': 'Q30',
          'text': 'United States'
        }
      ]
    }
  ],
  'attribution': 'NOTICE: © 2018 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.'
};

module.exports = {
  generateLeisureCenter,
  randomItemFrom,
  sortByKey,
  mapboxTestAddress,
  mapboxTestCoordinates,
  mapboxMockResponse
};
