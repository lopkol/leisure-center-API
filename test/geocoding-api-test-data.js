'use strict';

const mapboxTestAddress = '825 Milwaukee Ave, Deerfield, Illinois 60015, United States';

const mapboxTestCoordinates = {
  longitude: -87.921434,
  latitude: 42.166602
};

const mapboxTestResponse = {
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
  mapboxTestAddress,
  mapboxTestCoordinates,
  mapboxTestResponse
};
