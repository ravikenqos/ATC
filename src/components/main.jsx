import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './login/login.jsx';


import './main.css';

class Main extends Component {
  render() {
    return (
      <Router>
          <div>
              <Route exact path = "/" component = {Login} />
              {/* <Route path = '/cars' component = {Car} />
              <Route path = '/about' component = {About} /> */}
          </div>
      </Router>
    );
  }
}

export default Main;
