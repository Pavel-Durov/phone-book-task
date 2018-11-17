'use strict';

import React from 'react';
import { Link } from "react-router-dom";
import { PhoneBookService } from '../../services/phoneBook';
import { isValidContact } from '../../common/validator';
import debug from 'debug';
const log = debug('component:CreateContact');

const infoContainerStyle = {
  display: 'flex',
  'flex-flow': 'column',
  margin: '3em 0 3em 0'
};
const infoItemStyle = {
  width: '50%'
};
const linkStyle = {
  'text-decoration': 'none',
  height: '2em',
  'text-align': 'auto',
  cursor: 'pointer',
  color: '#4286f4'
};

class CreateContact extends React.Component {
  constructor(props) {
    super(props);
    this.addContact = this.addContact.bind(this);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined
    };
  }
  addContact() {
    const contact = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      phoneNumber: this.refs.phoneNumber.value
    };
    log('composed contact', contact);
    if (isValidContact(contact)) {
      PhoneBookService.addContact(contact).then(() => {
        log('addContact done');
        this.props.history.push('/');
      })
    } else {
      alert('Invalid contact details!')
    }
  }
  render() {
    return (
      <section>
        <Link to="/" style={linkStyle}>
          &lsaquo; Back
        </Link>
        <div style={infoContainerStyle}>
          <span>First Name:</span>
          <input style={infoItemStyle} type="text"
            ref="firstName" value={this.state.firstName} />
          <span>Last Name:</span>
          <input style={infoItemStyle} type="text"
            ref="lastName" value={this.state.lastName} />
          <span>Phone:</span>
          <input style={infoItemStyle} type="text"
            ref="phoneNumber" value={this.state.phoneNumber} type="number" />
        </div>
        <a style={linkStyle} onClick={this.addContact}>
          Create
        </a>
      </section>
    );
  }
}

export default CreateContact;