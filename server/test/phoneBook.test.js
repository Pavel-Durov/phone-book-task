const { expect } = require('chai');

const phoneBookService = require('../services/phoneBook');
const db = require('../services/db');

describe('phoneBook', () => {
  beforeEach(() => {
    db.reset();
  });

  it('should return empty list', () => {
    const phoneBook = phoneBookService.getPhoneBook();
    expect(phoneBook).to.be.empty;
  });

  const testContact = { id: 1, firstName: 'Pavel', lastName: 'Durov', phoneNumber: '777' };

  it('should return list with single item', () => {
    phoneBookService.addContact(testContact);
    const [{ firstName, lastName, phoneNumber }] = phoneBookService.getPhoneBook();
    expect(firstName).to.eql(testContact.firstName);
    expect(lastName).to.eql(testContact.lastName);
    expect(phoneNumber).to.eql(testContact.phoneNumber);
  });
  it('should add/remove items constantly', () => {
    phoneBookService.addContact(testContact);
    const [{ firstName, lastName, phoneNumber, id }] = phoneBookService.getPhoneBook();
    expect(firstName).to.eql(testContact.firstName);
    expect(lastName).to.eql(testContact.lastName);
    expect(phoneNumber).to.eql(testContact.phoneNumber);
    phoneBookService.removeContact(id);
    const phoneBook = phoneBookService.getPhoneBook();
    expect(phoneBook).to.be.empty;
  });
});
