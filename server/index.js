'use strict';

const debug = require('debug')('service:phoneBook');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const phoneBook = require('./services/phoneBook');
const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/all', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const allEntities = phoneBook.getPhoneBook();
  res.send(JSON.stringify(allEntities));
});

app.post('/addContact', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  debug('/addContact', req);
  try {
    phoneBook.addContact(req.body);
    res.body = JSON.stringify({ success: true });
    res.status = 200;
  } catch (e) {
    res.status = 500;
  }
  res.end();
});
app.put('/updateContact', function (req, res) {
  debug('/updateContact', req);
  try {
    phoneBook.updateContact(req.body);
    res.body = JSON.stringify({ success: true });
    res.setHeader('Content-Type', 'application/json');
  } catch (e) {
    res.status = 500;
  }
  res.end();
});

app.delete('/deleteContact', function (req, res) {
  debug('/updateContact', req);
  try {
    phoneBook.deleteContact(req.query.id);
    res.body = JSON.stringify({ success: true });
    res.setHeader('Content-Type', 'application/json');
  } catch (e) {
    res.status = 500;
  }
  res.end();
});

app.listen(port, () => debug(`Example app listening on port ${port}!`));
