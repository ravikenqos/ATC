import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './login/login.jsx';
import SignUp from './signup/signup.jsx';
import Logout from './logout/logout.jsx';
import ProductBulkUpload from './product/productBulkUpload.jsx';
import MaterialUiForm from './MaterialUiForm.jsx';


import './main.css';

class Main extends Component {
  render() {
    return (
      <Router>
          <div>
              <Route exact path = "/" component = {Login} />
              <Route path = '/signup' component = {SignUp} />
              <Route path = '/logout' component = {Logout} />
              <Route path = '/mat' component = {MaterialUiForm} />
              <Route path = '/productbulkupload' component = {ProductBulkUpload} />
          </div>
      </Router>
    );
  }
}

export default Main;
