'use strict';

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Leisure centers',
    description: 'Leisure center management API',
    contact: {
      name: 'lopkol',
      url: 'https://github.com/lopkol'
    }
  },
  servers: [
    {
      url: 'http://localhost:2627/',
      description: 'Local server'
    }
  ],
  tags: [
    {
      name: 'leisure centers'
    },
    {
      name: 'activities'
    }
  ],
  security: [
    {
      BearerAuth: []
    }
  ],
  paths: {
    '/leisure-centers': {
      post: {
        tags: ['leisure centers'],
        description: 'Create a new leisure center',
        operationId: 'createLeisureCenter',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LeisureCenterReq'
              }
            }
          },
          required: true
        },
        responses: {
          '201': {
            description: 'New leisure center was created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LeisureCenterWithCoordinates'
                }
              }
            }
          },
          '400': {
            description: 'Invalid data'
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError'
          }
        }
      },
      get: {
        tags: ['leisure centers'],
        description: 'Get a paginated list of leisure centers, filterable by activity',
        operationId: 'getLeisureCenters',
        parameters: [
          {
            name: 'activity',
            in: 'query',
            description: 'The value must be one activity, leave out this parameter if no filter required',
            schema: {
              type: 'string'
            },
            required: false
          },
          {
            name: 'offset',
            in: 'query',
            description: 'Index where the pagination starts, the default is 0 (list ordered by id)',
            schema: {
              type: 'integer'
            },
            required: false
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Maximum number of results to return, the default is to return all of them',
            schema: {
              type: 'integer'
            },
            required: false
          }
        ],
        requestBody: {},
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/LeisureCenterWithWeather'
                  }
                }
              }
            }
          },
          '401':{
            $ref: '#/components/responses/UnauthorizedError'
          }
        }
      }
    },
    '/leisure-centers/{id}': {
      patch: {
        tags: ['leisure centers'],
        description: 'Update a leisure center',
        operationId: 'updateLeisureCenter',
        parameters: [{
          name: 'id',
          in: 'path',
          description: 'The id of the leisure center to update',
          schema: {
            $ref: '#/components/schemas/idType'
          },
          required: true
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LeisureCenter'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Leisure center was updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LeisureCenterWithCoordinates'
                }
              }
            }
          },
          '400': {
            description: 'Invalid data'
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError'
          },
          '404': {
            $ref: '#/components/responses/NotFoundError'
          }
        }
      },
      delete: {
        tags: ['leisure centers'],
        description: 'Remove a leisure center',
        operationId: 'deleteLeisureCenter',
        parameters: [{
          name: 'id',
          in: 'path',
          description: 'The id of the leisure center to remove',
          schema: {
            $ref: '#/components/schemas/idType'
          },
          required: true
        }],
        requestBody: {},
        responses: {
          '204': {
            description: 'Leisure center was removed'
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError'
          },
          '404': {
            $ref: '#/components/responses/NotFoundError'
          }
        }
      }
    },
    '/activities': {
      get: {
        tags: ['activities'],
        description: 'Get the list of available activities',
        operationId: 'getActivities',
        parameters: [],
        requestBody: {},
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/activity'
                  }
                }
              }
            }
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError'
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      idType: {
        type: 'integer',
        example: 6
      },
      nameType: {
        type: 'string',
        description: 'The name of the leisure center',
        example: 'Altitude Activities'
      },
      descriptionType: {
        type: 'string',
        description: 'A short description of the leisure center',
        example: 'The best Slovenia adventure holidays and day tours'
      },
      link: {
        type: 'string',
        description: 'Link to the website of the leisure center',
        example: 'https://www.altitude-activities.com/'
      },
      address: {
        type: 'string',
        dscription: 'The address of the leisure center',
        example: 'Ljubljanska cesta 1, Bled 4260, Slovenia'
      },
      activity: {
        type: 'string',
        example: 'Canyoning'
      },
      Coordinates: {
        type: 'object',
        properties: {
          longitude: {
            type: 'number',
            example: 14.110633
          },
          latitude: {
            type: 'number',
            example: 46.367535
          }
        }
      },
      Weather: {
        type: 'object',
        description: 'The current weather at the given location. For more information, see https://openweathermap.org/api/one-call-api.',
        properties: {
          lat: {
            type: 'number',
            description: 'Geographical coordinates of the location (latitude)'
          },
          lon: {
            type: 'number',
            description: 'Geographical coordinates of the location (longitude)'
          },
          timezone: {
            type: 'string',
            description: 'Timezone name for the requested location'
          },
          timezone_offset: {
            type: 'number',
            description: 'Shift in seconds from UTC'
          },
          current: {
            type: 'object',
            description: 'Current weather data',
            properties: {
              dt: {
                type: 'number',
                desription: 'Current time, Unix, UTC'
              },
              sunrise: {
                type: 'number',
                description: 'Sunrise time, Unix, UTC'
              },
              sunset: {
                type: 'number',
                description: 'Sunset time, Unix, UTC'
              },
              temp: {
                type: 'number',
                description: 'Temperature. Units: Celsius'
              },
              feels_like: {
                type: 'number',
                description: 'Temperature. This temperature parameter accounts for the human perception of weather. Units: Celsius'
              },
              pressure: {
                type: 'number',
                description: 'Atmospheric pressure on the sea level, hPa'
              },
              humidity: {
                type: 'number',
                description: 'Humidity, %'
              },
              dew_point: {
                type: 'number',
                description: 'Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units: Celsius'
              },
              clouds: {
                type: 'number',
                description: 'Cloudiness, %'
              },
              uvi: {
                type: 'number',
                description: 'Current UV index'
              },
              visibility: {
                type: 'number',
                description: 'Average visibility, metres'
              },
              wind_speed: {
                type: 'number',
                description: 'Wind speed. Wind speed. Units: metre/sec'
              },
              wind_gust: {
                type: 'number',
                description: '(where available) Wind gust. Units: metre/sec'
              },
              wind_deg: {
                type: 'number',
                description: 'Wind direction, degrees (meteorological)'
              },
              rain: {
                type: 'object',
                properties: {
                  '1h': {
                    type: 'number',
                    description: '(where available) Rain volume for last hour, mm'
                  }
                }
              },
              snow: {
                type: 'object',
                properties: {
                  '1h': {
                    type: 'number',
                    description: '(where available) Snow volume for last hour, mm'
                  }
                }
              },
              weather: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                    description: 'Weather condition id, https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2'
                  },
                  main: {
                    type: 'string',
                    description: 'Group of weather parameters (Rain, Snow, Extreme etc.)'
                  },
                  description: {
                    type: 'string',
                    description: 'Weather condition within the group (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)'
                  },
                  icon: {
                    type: 'number',
                    description: 'Weather icon id, https://openweathermap.org/weather-conditions#How-to-get-icon-URL'
                  }
                }
              }
            }
          }
        }
      },
      LeisureCenterWithWeather: {
        description: 'A representation of a leisure center with location and weather data (if available)',
        allOf: [
          {
            $ref: '#/components/schemas/LeisureCenterWithCoordinates'
          },
          {
            type: 'object',
            properties: {
              weather: {
                $ref: '#/components/schemas/Weather'
              }
            }
          }
        ]
      },
      LeisureCenterWithCoordinates: {
        description: 'A representation of a leisure center with location (if available)',
        allOf: [
          {
            $ref: '#/components/schemas/LeisureCenterWithId'
          },
          {
            type: 'object',
            properties: {
              coordinates: {
                $ref: '#/components/schemas/Coordinates'
              }
            }
          }
        ]
      },
      LeisureCenterWithId: {
        description: 'A representation of a leisure center with ID',
        allOf: [
          {
            type: 'object',
            properties: {
              id: {
                $ref: '#/components/schemas/idType'
              }
            },
            required: ['id']
          },
          {
            $ref: '#/components/schemas/LeisureCenterReq'
          }
        ]
      },
      LeisureCenterReq: {
        description: 'A representation of a leisure center, all properties are required',
        type: 'object',
        properties: {
          name: {
            $ref: '#/components/schemas/nameType'
          },
          description: {
            $ref: '#/components/schemas/descriptionType'
          },
          address: {
            $ref: '#/components/schemas/address'
          },
          link: {
            $ref: '#/components/schemas/link'
          },
          activity: {
            $ref: '#/components/schemas/activity'
          }
        },
        required: ['name', 'description', 'address', 'link', 'activity']
      },
      LeisureCenter: {
        description: 'A representation of a leisure center, all properties are optional',
        type: 'object',
        properties: {
          name: {
            $ref: '#/components/schemas/nameType'
          },
          description: {
            $ref: '#/components/schemas/descriptionType'
          },
          address: {
            $ref: '#/components/schemas/address'
          },
          link: {
            $ref: '#/components/schemas/link'
          },
          activity: {
            $ref: '#/components/schemas/activity'
          }
        }
      }
    },
    responses: {
      UnauthorizedError: {
        description: 'Access token is missing or invalid.'
      },
      NotFoundError: {
        description: 'The specified ID was not found.'
      }
    }
  }
};
