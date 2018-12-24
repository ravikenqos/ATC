import React from 'react';
import LogInForm from './logInForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';

import './login.css';
import logo from '../../assets/atclogo.png';

import { userLogin, userActionStatus }  from './../../actions/authentication'
const path = require('path');



class Login extends React.Component {
  componentWillMount(){
    this.props.userActionStatus("authenticationError");
  }

  constructor(props) {
    super(props);
  }

  submit = (values) => {
    this.props.userLogin(values, this.props.history)
    if(this.props.errorMessage){
      this.props.userActionStatus("authenticationError");
    }
  }

  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red loginerr">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const image_url = '../../';
    return (
       <Grid className="container">
        <Grid className="authContainer">
          <Grid md={6} className="authLeftCoulmn">
              <div className="appLogo">
                <img src={logo}/>
              </div>        
          </Grid>
          <Grid md={6} className="authRightCoulmn">
            <div className="authForm" >   
              <div className="loginContent">
                  <div className="authtitle">
                    <p className="loginhead">Sign into your account</p>
                  </div> 
                  <br/>
                  <div className="loginForm" >
                    <LogInForm  onSubmit={this.submit} />
                    {this.errorMessage()}
                  </div> 

                  <div className="authText">
                    <span>New to ATC? <Link to="/signup" className="authtxt"> Create your account. </Link></span>
                  </div>  
                  
              </div>    
            </div>
          </Grid>                  
        </Grid>
      </Grid>  
      
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, auth: state.authenticated };
}

export default connect(mapStateToProps, { userLogin, userActionStatus })(Login);