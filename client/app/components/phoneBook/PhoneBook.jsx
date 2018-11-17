'use strict';

import React from 'react';
import { Link } from "react-router-dom";
import ContactList from '../contactList/ContactList.jsx';
import { PhoneBookService } from '../../services/phoneBook';
import { isValidContact } from '../../common/validator';
import debug from 'debug';

const log = debug('component:PhoneBook');
const headerContainerStyle = {
  display: 'flex',
  'justify-content': 'space-between'
};
const createContactBtnStyle = {
  'text-decoration': 'none',
  height: '2em',
  'text-align': 'auto',
  color: '#4286f4'
};

class PhoneBook extends React.Component {
  constructor(props) {
    super(props);
    this.addContact = this.addContact.bind(this);
    this.state = { contacts: [] };
  }
  addContact(contact) {
    log('addContact', contact);
    if (isValidContact(contact)) {
      PhoneBookService.addContact(contact).then(() => {
        this.loadContacts();
      });
    } else {
      alert('Invalid contact details!');
    }
  }
  loadContacts() {
    PhoneBookService.getAll()
      .then((data) => {
        log('PhoneBookService.getAll, data:', data);
        this.setState({
          contacts: data
        });
      });
  }
  componentDidMount() {
    this.setState({ contacts: [] });
    this.loadContacts();
  }
  render() {
    return (
      <div>
        <div style={headerContainerStyle}>
          <h1>Phone Book</h1>
          <Link to="/create" style={createContactBtnStyle}>
            Create new Contact
          </Link>
        </div>
        <ContactList contacts={this.state.contacts} />
      </div >
    );
  }
}

export default PhoneBook;