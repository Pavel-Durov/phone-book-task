'use strict';

function isValidContact({ firstName, lastName, phoneNumber }) {
  return firstName && lastName && phoneNumber;
}

export { isValidContact };