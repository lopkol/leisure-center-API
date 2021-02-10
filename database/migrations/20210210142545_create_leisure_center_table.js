'use strict';

exports.up = function(knex) {
  return knex.schema
    .createTable('leisure_centers', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.text('description');
      table.text('address');
      table.text('link');
      table.string('activity');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('leisure_centers');
};
