import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, IndexRoute, browserHistory  } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Login from './login/login.jsx';
import SignUp from './signup/signup.jsx';
import Logout from './logout/logout.jsx';
import ProductBulkUpload from './product/productBulkUpload.jsx';
import AddProduct from './product/addProduct.jsx';
import manageProducts from './product/manageProducts.jsx';
import SideBar from './sidebar/sideBar.jsx';
import Header from './header/header.jsx';

import  { Redirect } from 'react-router-dom'

import { authenticate  }  from './../actions/authentication.jsx';

import './main.css';
class Main extends Component {
  componentWillMount(){
      this.props.authenticate();
  }
  render() {
      console.log('mainauth', this.props.authenticated);
      if(this.props.authenticated){
        return (
        <div className='approot'>
            <Router>
            <Grid container className='appcontainer'>              
                  <SideBar />
                  <Grid md={9} item className="pageContainer">
                    <Header/>
                    <Route exact path = '/ProductBulkUpload' component = {ProductBulkUpload} />
                    <Route exact path = '/addproduct' component = {AddProduct} />
                    <Route exact path = '/manageProducts' component = {manageProducts} />
                    <Route exact path = '/logout' component = {Logout} />
                    {/* <Redirect to="/ProductBulkUpload"/> */}
                  </Grid>
              </Grid>
            </Router>
        </div>
      );
      }
      if(!this.props.authenticated){
      return (
        <div>
          <Router >
          <div>
              <Route exact path = "/" component = {Login} />
              <Route path = '/signup' component = {SignUp} />
          </div>
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

export default connect(mapStateToProps, { authenticate } )(Main);