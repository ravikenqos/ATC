import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, IndexRoute, browserHistory  } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
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
import Store from './store/store.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import AddYourProducts from './addyourproducts/addyourproducts.jsx';
import AccountSettings from './accountsettings/accountsettings.jsx';
import ListProducts from './listproducts/listproducts.jsx';


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
            <div className='appcontainer'>              
                  <SideBar />
                  <div className="pageContainer">
                    <Header/>
                    <div className="clearboth"></div>
                    <Route exact path = '/productbulkupload' component = {ProductBulkUpload} />
                    <Route exact path = '/addproduct' component = {AddProduct} />
                    <Route exact path = '/manageProducts' component = {manageProducts} />
                    <Route exact path = '/store' component = {Store} />
                    <Route exact path = '/logout' component = {Logout} />
                    <Route exact path = '/dashboard' component = {Dashboard} />
                    <Route exact path = '/accountsettings' component = {AccountSettings} />
                    <Route exact path = '/listproducts' component = {ListProducts} />
                    <Route exact path = '/addyourproducts' component = {AddYourProducts} />
                    
                    {/* <Redirect to="/ProductBulkUpload"/> */}
                  </div>
              </div>
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