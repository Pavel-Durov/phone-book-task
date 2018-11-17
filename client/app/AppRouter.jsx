import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PhoneBook from './components/phoneBook/PhoneBook.jsx';
import CreateContact from './components/createContact/CreateContact.jsx';
import ContactInfo from './components/contactInfo/ContactInfo.jsx'
/*
  Known issue (console warning pollution):
  https://github.com/ReactTraining/react-router/issues/5173
 */
const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={PhoneBook} />
      <Route path="/create" component={CreateContact} />
      <Route path="/contactInfo/" component={ContactInfo} />
    </div>
  </Router>
);

export default AppRouter;