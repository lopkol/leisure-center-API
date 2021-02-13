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

function generateLeisureCenterWithCoordinates(properties) {
  const leisureCenter = generateLeisureCenter(properties);
  const coordinates = {
    longitude: randomIntBetween(-180, 180),
    latitude: randomIntBetween(-90, 90)
  };
  return {
    ...leisureCenter,
    coordinates
  };
}

module.exports = {
  generateLeisureCenter,
  generateLeisureCenterWithCoordinates,
  randomItemFrom,
  sortByKey
};
