'use strict';
const debug = require('debug')('service:db');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const csv = require('csvtojson');

const adapter = new FileSync(process.env.DB_FILE);
const db = low(adapter);

csv().fromFile('./data/MOCK_DATA.csv')
  .then((mockedData) => {
    db.defaults({
      phoneBook: mockedData
    }).write();
  });

module.exports = {
  reset: () => {
    db.set('phoneBook', []).write();
  },
  get: (key) => {
    debug('get, key:', key);
    const result = db.get(key);
    debug(`get, key:, ${key}, result: %j`, result);
    return result.value();
  },
  set: (key, value) => {
    debug('get, set:', key);
    db.set(key, value)
      .write();
  },
  deleteById: (key, id) => {
    debug(`removeById, key: ${key}, id: ${id}`);
    db.get(key)
      .remove({ id })
      .write();
  },
  updateById: (key, entity) => {
    debug(`removeById, key: ${key}, id: ${entity.id}`);
    db.get(key)
      .find({ id: entity.id })
      .assign(entity)
      .write();
  }
};
