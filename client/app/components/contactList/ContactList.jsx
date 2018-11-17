'use strict';

import React from 'react';
import { Link } from "react-router-dom";
import debug from 'debug';
const log = debug('component:ContactList');

const listStyle = {
  'border-left': '1px solid #ccc'
};
const contactStyle = {
  'border-bottom': '1px solid #ccc',
  padding: '10px',
};
const linkStyle = {
  'text-decoration': 'none',
  color: 'black'
};
const contactInfo = {
  margin: '0px 5px 5px 0px',
};
const paginationTextStyle = {
  margin: '0px 7px 0px 7px',
};
const paginationContainerStyle = {
  margin: '5px',
  display: 'flex',
  'justify-content': 'space-between'
};
const searchBoxStyle = {
  width: '100%',
  height: '2em'
};
class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.state = {
      contacts: props.contacts,
      contactsPage: []
    };
    this.pageSize = 10;
  }
  componentWillReceiveProps(props) {
    this.setState({
      contacts: props.contacts,
      filteredContacts: props.contacts,
      contactsPage: this.getNextPage(props.contacts),
      totalPages: Math.round(props.contacts.length / this.pageSize),
      currentPage: 0
    });
  }
  getNextPage(contacts, currentPage = 0) {
    const pageIndex = currentPage * this.pageSize;
    let nextPage = [];
    if (contacts.length) {
      nextPage = contacts.slice(pageIndex, pageIndex + this.pageSize);
    }
    debug('getNextPage, content:', nextPage);
    return nextPage;
  }
  handleNextPageClick() {
    const { currentPage, contacts } = this.state;
    let nextPageNumber = currentPage;
    if ((nextPageNumber * this.pageSize) + 1 < contacts.length) {
      nextPageNumber += 1;
    }
    log('nextPageNumber', nextPageNumber);
    const next = this.getNextPage(this.state.filteredContacts, nextPageNumber);
    this.setState({
      contactsPage: next,
      currentPage: nextPageNumber
    });
  }
  handlePrevPageClick() {
    const { currentPage } = this.state;
    let nextPageNumber = currentPage;
    if (nextPageNumber - 1 > -1) {
      nextPageNumber -= 1;
    }
    log('handlePrevPageClick', nextPageNumber);
    const next = this.getNextPage(this.state.filteredContacts, nextPageNumber);
    this.setState({
      contactsPage: next,
      currentPage: nextPageNumber
    });
  }
  onSearchChange() {
    const filterBy = this.refs.searchFilter.value.toLocaleLowerCase();
    debug('search', this.refs.searchFilter);
    let filtered;
    if (filterBy) {
      filtered = this.state.contacts.filter(contact => {
        return contact.firstName.toLocaleLowerCase().includes(filterBy)
          || contact.lastName.toLocaleLowerCase().includes(filterBy)
          || contact.phoneNumber.toLocaleLowerCase().includes(filterBy);
      });
    } else {
      filtered = this.state.contacts;
    }
    this.setState({
      contactsPage: this.getNextPage(filtered, this.state.currentPage),
      currentPage: 0,
      totalPages: Math.round(filtered.length / this.pageSize)
    });
  }
  render() {
    return (
      <section>
        <div>
          <input type="text" onChange={this.onSearchChange}
            ref="searchFilter" style={searchBoxStyle}
            placeholder="Search here..." alt="Search by first name, last name & phone number" />
        </div>
        <section style={listStyle}>
          {
            this.state.contactsPage.map(({ firstName, lastName, phoneNumber, id }) =>
              <Link style={linkStyle} to={{
                pathname: `/contactInfo/${id}`,
                query: {
                  firstName: firstName,
                  lastName: lastName,
                  phoneNumber: phoneNumber,
                  id: id
                }
              }}>
                <div key={id} style={contactStyle}>
                  <p style={contactInfo}>
                    {firstName}
                    {lastName}
                  </p>
                  <span style={contactInfo}>
                    {phoneNumber}
                  </span>
                </div>
              </Link>
            )
          }
        </section>
        <div style={paginationContainerStyle}>
          <input type="button" value="&laquo;" onClick={this.handlePrevPageClick} />
          <span style={paginationTextStyle}>{this.state.currentPage + 1}/{this.state.totalPages}</span>
          <input type="button" value="&raquo;" onClick={this.handleNextPageClick} />
        </div>
      </section>
    );
  }
}

export default ContactList;