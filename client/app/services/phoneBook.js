'use strict';
import { api } from '../common/const';
import debug from 'debug';

const log = debug('service:PhoneBookService');

export class PhoneBookService {
  static getAll() {
    log('getAll');
    return new Promise((resolve, reject) => {
      fetch(`${api.baseUrl}/all`).then(a => a.json())
        .then(resolve)
        .catch(reject);
    });
  }
  static addContact(contact) {
    log('addContact');
    return fetch(`${api.baseUrl}/addContact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(contact),
    });
  }
  static updateContact(contact) {
    log('updateContact');
    if (!contact.id) {
      throw new Error('Invalid contact details!');
    }
    return fetch(`${api.baseUrl}/updateContact`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(contact)
    });
  }
  static deleteContact(id) {
    log('deleteContact');
    if (!id) {
      throw new Error('Invalid contact details!');
    }
    return fetch(`${api.baseUrl}/deleteContact?id=${id}`, {
      method: 'DELETE',
    });
  }
}
