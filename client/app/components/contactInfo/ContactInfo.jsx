'use strict';

import React from 'react';
import { Link } from "react-router-dom";
import { PhoneBookService } from '../../services/phoneBook';
import { isValidContact } from '../../common/validator';
import debug from 'debug';

const log = debug('component:ContactInfo');

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
  color: '#4286f4',
  margin: '10px'
};

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.updateContact = this.updateContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {};
  }
  componentDidMount() {
    const {
      firstName,
      lastName,
      phoneNumber,
      id
    } = this.props.location.query;
    this.setState({
      firstName, lastName, phoneNumber, id
    });
  }
  updateContact() {
    const contact = this.state;
    log('composed update contact', contact);
    if (isValidContact(contact)) {
      PhoneBookService.updateContact(contact).then(() => {
        log('updateContact done');
        this.props.history.push('/');
      });
    } else {
      alert('Invalid contact details!');
    }
  }
  deleteContact() {
    const { id } = this.state;
    log(`delete contact ${id}`);
    PhoneBookService.deleteContact(id).then(() => {
      log(`${id} contact deleted`);
      this.props.history.push('/');
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
            name="firstName" onChange={this.onChange} value={this.state.firstName} />

          <span>Last Name:</span>

          <input style={infoItemStyle} type="text"
            name="lastName" onChange={this.onChange} value={this.state.lastName} />

          <span>Phone:</span>
          <input style={infoItemStyle} type="text"
            name="phoneNumber" onChange={this.onChange} value={this.state.phoneNumber} type="number" />
        </div>
        <div>
          <a style={linkStyle} onClick={this.updateContact}>Update</a>
          <a style={linkStyle} onClick={this.deleteContact}>Delete</a>
        </div>
      </section>
    );
  }
}

export default ContactInfo;