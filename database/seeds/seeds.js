'use strict';

const generateLeisureCenters = require('../../scripts/generate-data');

const leisureCenters = generateLeisureCenters();

exports.seed = function(knex) {
  return knex('leisure_centers')
    .del()
    .then(function() {
      return knex.raw('alter sequence leisure_centers_id_seq restart with 1;');
    })
    .then(async function() {
      return knex('leisure_centers').insert(await Promise.all(leisureCenters));
    });
};
