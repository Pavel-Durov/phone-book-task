'use strict';

const db = require('./db');
const debug = require('debug')('service:phoneBook');
const generateSafeId = require('generate-safe-id');
const keys = {
  PHONE_BOOK: 'phoneBook'
};
module.exports = {
  getPhoneBook: () => {
    return db.get(keys.PHONE_BOOK);
  },
  addContact: (contact) => {
    debug('addContact', contact);
    const phoneBook = db.get(keys.PHONE_BOOK);
    const contactIdentity = Object.assign({}, contact, { id: generateSafeId() });
    db.set(keys.PHONE_BOOK, [...phoneBook, contactIdentity]);
  },
  removeContact: (contactId) => {
    debug('removeContact', contactId);
    db.removeById(keys.PHONE_BOOK, contactId);
  },
  updateContact: (contact) => {
    debug('updateContact', contact);
    db.updateById(keys.PHONE_BOOK, contact);
  },
  deleteContact: (id) => {
    debug('deleteContact', id);
    db.deleteById(keys.PHONE_BOOK, id);
  }
};