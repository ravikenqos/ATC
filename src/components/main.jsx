import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Login from './login/login.jsx';
import SignUp from './signup/signup.jsx';
import Logout from './logout/logout.jsx';
import ProductBulkUpload from './product/productBulkUpload.jsx';
import manageProducts from './product/manageProducts.jsx';
import MaterialUiForm from './MaterialUiForm.jsx';
import SideBar from './sidebar/sideBar.jsx';
import Header from './header/header.jsx';
import  { Redirect } from 'react-router-dom'

import './main.css';
import login from './login/login.jsx';

class Main extends Component {
  render() {
    console.log('auth', this.props.authenticated);
    if(true) { //if authenticated()
      
      return (
        <div>
          <Router>
          <div>
            <Route exact path = "/" component = {Login} />
            <Route path = '/signup' component = {SignUp} />
            </div>
        </Router>
      </div>
      );

    } else {
      
      return (
        <div className='approot'>
            <Router>
            <Grid container className='appcontainer'>              
                  <SideBar />
                  <Grid md={10} item className="pageContainer">
                    <Header/>
                    <Route path = '/logout' component = {Logout} />
                    <Route path = '/mat' component = {MaterialUiForm} />
                    <Route path = '/productbulkupload' component = {ProductBulkUpload} />
                    <Route path = '/manageProducts' component = {manageProducts} />
                  </Grid>
              </Grid>
            </Router>
        </div>
      );

    }    
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Main);