import React, { Component } from 'react';
import SignupForm from './signupForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



import Grid from '@material-ui/core/Grid';

import './signup.css';
import backgroundImage from '../../assets/backgroundimage.jpg';
import logo from '../../assets/atclogo.png';

import { userSignup  }  from './../../actions/authentication'

class SignUp extends Component {
    constructor(props) {
        super(props);
      }
    
      submit = (values) => {
        console.log(values);
        let val = { "username": values.email,
        "email": values.email,
        "password": values.password,
        "emailVerified": true,}
        this.props.userSignup(val, this.props.history)
      }
    
      errorMessage() {
        if (this.props.errorMessage) {
          return (
            <div className="info-red">
              {this.props.errorMessage}
            </div>
          );
        }
      }
    
      render() {
        const image_url = {backgroundImage};
        return (
           <Grid className="container">
            <Grid className="authContainer">
              <Grid md={6} className="authLeftCoulmn">
                  <div className="appLogo">
                  <img src={logo}/>
                  </div>        
              </Grid>
              <Grid md={6} className="authRightCoulmn">
                <div className="authSIgnupForm" >   
                  <div className="authContent">
                      <div className="authtitle">
                        <p className="authtitlecont1">Setup Your Account</p>
                        <p className="authtitlecont2">Connecting Local business to consumers in every Community</p>
                      </div> 
    
                      <div className="signupForm" >
                        <SignupForm  onSubmit={this.submit} />
                        {this.errorMessage()}
                      </div> 
    
                      <div className="authText">
                        <span>Already have an account? <Link to="/" className="authtxt"> Login. </Link></span>
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
    return { errorMessage: state.auth.error };
  }
  
  export default connect(mapStateToProps, { userSignup })(SignUp);

