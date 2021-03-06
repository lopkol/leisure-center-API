'use strict';

const db = require('./db');
const rundef = require('rundef');

async function createLeisureCenter({ name, description, address, link, activity, coordinates }) {
  const propertiesToSave = rundef({ name, description, address, link, activity, coordinates }, false, false);
  const [savedLeisureCenter] = await db('leisure_centers')
    .insert(propertiesToSave)
    .returning('*');
    
  return savedLeisureCenter;
} 

async function getLeisureCenterById(id) { //for tests
  const result = await db('leisure_centers')
    .where({ id })
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  return result[0];
}

async function getAllLeisureCenters() { //for tests
  const result = await db('leisure_centers').select();

  return result;
}

async function updateLeisureCenter(id, { name, description, address, link, activity, coordinates } = {}) {
  const propertiesToUpdate = rundef({ name, description, address, link, activity, coordinates }, false, false);
  const result = await db('leisure_centers')
    .where({ id })
    .update(propertiesToUpdate)
    .returning('*');

  if (result.length === 0) {
    return null;
  }
  return result[0];
}

async function deleteLeisureCenter(id) {
  const result = await db('leisure_centers')
    .where({ id })
    .returning('*')
    .del();

  if (result.length === 0) {
    return null;
  }
  return result[0];
}

async function getActivities() {
  const result = await db('leisure_centers')
    .select('activity')
    .distinct('activity');
  
  const activities = result.map(leisureCenter => leisureCenter.activity);
  return activities;
}

async function getPaginatedLeisureCentersByActivity({ offset = 0, limit = undefined, activity = undefined } = {}) {
  const activityFilter = rundef({ activity }, false, false);
  
  const query = db('leisure_centers')
    .orderBy('id')
    .where(activityFilter)
    .offset(offset);

  if (limit) {
    query.limit(limit);
  }

  const result = await query.select();
  return result;
}

module.exports = {
  createLeisureCenter,
  getLeisureCenterById,
  getAllLeisureCenters,
  updateLeisureCenter,
  deleteLeisureCenter,
  getActivities,
  getPaginatedLeisureCentersByActivity
};
