'use strict';

const db = require('./db');
const rundef = require('rundef');

async function createLeisureCenter({ name, description, address, link, activity }) {
  const propertiesToSave = rundef({ name, description, address, link, activity }, false, false);
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

  const leisureCenter = result[0];
  return leisureCenter;
}

async function getAllLeisureCenters() { //for tests
  const result = await db('leisure_centers').select();

  return result;
}

async function updateLeisureCenter(id, { name, description, address, link, activity } = {}) {
  const propertiesToUpdate = rundef({ name, description, address, link, activity }, false, false);
  await db('leisure_centers')
    .where({ id })
    .update(propertiesToUpdate);
}

async function deleteLeisureCenter(id) {
  await db('leisure_centers')
    .where({ id })
    .del();
}

async function getActivities() {
  const result = await db('leisure_centers')
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
