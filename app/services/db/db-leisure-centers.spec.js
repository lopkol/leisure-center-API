'use strict';

const { omit } = require('lodash');
const db = require('./db');
const {
  createLeisureCenter,
  getLeisureCenterById,
  getAllLeisureCenters,
  updateLeisureCenter,
  deleteLeisureCenter,
  getActivities,
  getPaginatedLeisureCentersByActivity
} = require('./db-leisure-centers');
const { generateLeisureCenter, randomItemFrom, sortByKey } = require('../../../test/test-helpers');


describe('Leisure center db services', () => {
  beforeEach(async () => {
    await db('leisure_centers').truncate();
  });

  describe('createLeisureCenter', () => {
    it('creates a leisure center with the given properties', async () => {
      const leisureCenterData = generateLeisureCenter();
      const { id } = await createLeisureCenter(leisureCenterData);

      const savedLeisureCenter = await getLeisureCenterById(id);
      const savedData = omit(savedLeisureCenter, 'id');

      expect(savedData).toEqual(leisureCenterData);
    });
  });

  describe('getLeisureCenterById', () => {
    it('returns null if the leisure center does not exist', async () => {
      const id = 26;
      const result = await getLeisureCenterById(id);

      expect(result).toBe(null);
    });

    it('returns the correct leisure center if present', async () => {
      const leisureCenterData = generateLeisureCenter();
      const otherLeisureCenterData = generateLeisureCenter();

      const { id } = await createLeisureCenter(leisureCenterData);
      await createLeisureCenter(otherLeisureCenterData);

      const savedLeisureCenter = await getLeisureCenterById(id);
      const expectedData = {
        id,
        ...leisureCenterData
      };
      
      expect(savedLeisureCenter).toEqual(expectedData);
    });
  });

  describe('getAllLeisureCenters', () => {
    it('returns all leisure centers', async () => {
      const leisureCentersData = Array(5).fill(null).map(() => generateLeisureCenter());

      await Promise.all(leisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      const result = await getAllLeisureCenters();
      const returnedData = result.map(leisureCenter => omit(leisureCenter, 'id'));

      expect(leisureCentersData).toEqual(jasmine.arrayWithExactContents(returnedData));
    });
  });

  describe('updateLeisureCenter', () => {
    it('retuns null if the leisure center does not exist', async () => {
      const id = 6;
      const result = await updateLeisureCenter(id, { name: 'nice new name', address: 'some new address' });

      expect(result).toBe(null);
    });

    it('does not modify other leisure centers', async () => {
      const leisureCenterData = generateLeisureCenter();
      const otherLeisureCentersData = Array(5).fill(null).map(() => generateLeisureCenter());

      const { id } = await createLeisureCenter(leisureCenterData);
      await Promise.all(otherLeisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      await updateLeisureCenter(id, { name: 'nice new name', address: 'some new address' });

      const allLeisureCentersInDb = await getAllLeisureCenters();
      const otherLeisureCentersInDb = allLeisureCentersInDb
        .filter(leisureCenter => leisureCenter.id !== id)
        .map(leisureCenter => omit(leisureCenter, 'id'));

      expect(otherLeisureCentersInDb).toEqual(jasmine.arrayWithExactContents(otherLeisureCentersData));
    });

    it('updates the properties correctly, does not modify other properties', async () => {
      const leisureCenterData = generateLeisureCenter();

      const { id } = await createLeisureCenter(leisureCenterData);

      const name = 'nice new name';
      const address = 'some new address';
      await updateLeisureCenter(id, { name, address });

      const result = await getLeisureCenterById(id);
      const expectedResult = {
        ...leisureCenterData,
        id,
        name,
        address
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('deleteLeisureCenter', () => {
    it('retuns null if the leisure center does not exist', async () => {
      const id = 6;
      const result = await deleteLeisureCenter(id);

      expect(result).toBe(null);
    });

    it('does not modify other leisure centers', async () => {
      const leisureCenterData = generateLeisureCenter();
      const otherLeisureCentersData = Array(5).fill(null).map(() => generateLeisureCenter());

      const { id } = await createLeisureCenter(leisureCenterData);
      await Promise.all(otherLeisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      await deleteLeisureCenter(id);

      const leisureCentersInDb = await getAllLeisureCenters();
      const leisureCentersDataInDb = leisureCentersInDb.map(leisureCenter => omit(leisureCenter, 'id'));

      expect(leisureCentersDataInDb).toEqual(jasmine.arrayWithExactContents(otherLeisureCentersData));
    });

    it('deletes the correct leisure center', async () => {
      const leisureCenterData = generateLeisureCenter();

      const { id } = await createLeisureCenter(leisureCenterData);
      await deleteLeisureCenter(id);

      const result = await getLeisureCenterById(id);

      expect(result).toBe(null);
    });
  });

  describe('getActivities', () => {
    it('returns all activities that are present', async () => {
      const activityList = ['hiking', 'climbing', 'canoeing', 'via ferrata', 'wakeboarding', 'kitesurfing'];
      const leisureCentersData = activityList.map(activity => generateLeisureCenter({ activity }));

      await Promise.all(leisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      const result = await getActivities();

      expect(result).toEqual(jasmine.arrayWithExactContents(activityList));
    });

    it('returns no duplicates', async () => {
      const activityList = ['hiking', 'climbing', 'canoeing'];
      const activitesPerLeisureCenter = activityList.concat(Array(4)
        .fill(null)
        .map(() => randomItemFrom(activityList)));
      const leisureCentersData = activitesPerLeisureCenter.map(activity => generateLeisureCenter({ activity }));

      await Promise.all(leisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      const result = await getActivities();

      expect(result).toEqual(jasmine.arrayWithExactContents(activityList));
    });
  });

  describe('getPaginatedLeisureCenters', () => {
    it('returns empty array if there is no matching activity', async () => {
      const activityList = ['hiking', 'climbing', 'canoeing'];
      const activitesPerLeisureCenter = Array(6).fill(null)
        .map(() => randomItemFrom(activityList));
      const leisureCentersData = activitesPerLeisureCenter.map(activity => generateLeisureCenter({ activity }));

      await Promise.all(leisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      const result = await getPaginatedLeisureCentersByActivity({ activity: 'cycling' });

      expect(result).toEqual([]);
    });

    it('does not filter activities if called without activity prop', async () => {
      const leisureCentersData = Array(5).fill(null).map(() => generateLeisureCenter());

      await Promise.all(leisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      const result = await getPaginatedLeisureCentersByActivity();
      const returnedData = result.map(leisureCenter => omit(leisureCenter, 'id'));

      expect(leisureCentersData).toEqual(jasmine.arrayWithExactContents(returnedData));
    });

    it('only returns centers with the given activity', async () => {
      const activityList = ['hiking', 'climbing', 'canoeing'];
      const activitesPerLeisureCenter = activityList.concat(Array(4)
        .fill(null)
        .map(() => randomItemFrom(activityList)));
      const leisureCentersData = activitesPerLeisureCenter.map(activity => generateLeisureCenter({ activity }));

      await Promise.all(leisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      const result = await getPaginatedLeisureCentersByActivity({ activity: 'hiking' });
      const returnedData = result.map(leisureCenter => omit(leisureCenter, 'id'));

      const expectedData = leisureCentersData.filter(leisureCenter => leisureCenter.activity === 'hiking');

      expect(returnedData).toEqual(jasmine.arrayWithExactContents(expectedData));
    });

    it('starts at given offset', async () => {
      const leisureCentersData = Array(8).fill(null).map(() => generateLeisureCenter());

      await Promise.all(leisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      const allLeisureCentersInDb = await getAllLeisureCenters();
      const result = await getPaginatedLeisureCentersByActivity({ offset: 3 });

      const expectedData = sortByKey(allLeisureCentersInDb, 'id').slice(3);

      expect(result).toEqual(jasmine.arrayWithExactContents(expectedData));
    });

    it('returns at most "limit" number of results if limit is given', async () => {
      const leisureCentersData = Array(8).fill(null).map(() => generateLeisureCenter());

      await Promise.all(leisureCentersData.map(async data => {
        await createLeisureCenter(data);
      }));

      const allLeisureCentersInDb = await getAllLeisureCenters();
      const result = await getPaginatedLeisureCentersByActivity({ limit: 3 });

      const expectedData = sortByKey(allLeisureCentersInDb, 'id').slice(0, 3);

      expect(result).toEqual(jasmine.arrayWithExactContents(expectedData));
    });
  });
});
