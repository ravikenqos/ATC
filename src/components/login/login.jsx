import React from 'react';
import LogInForm from './logInForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Grid from '@material-ui/core/Grid';
import './login.css';

import { userLogin  }  from './../../actions/authentication'

class Login extends React.Component {
  constructor(props) {
    super(props);
 
  }

  submit = (values) => {
    console.log(values);
    this.props.userLogin(values, this.props.history)
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
    const image_url = './assets/backgorundimage.jpg';
    return (
       <Grid className="container">
        <Grid className="authContainer">
          <Grid md={6} className="authLeftCoulmn">
              <div className="appLogo">
                <img src="./assets/atclogo.png"/>
              </div>        
          </Grid>
          <Grid md={6} className="authRightCoulmn">
            <div className="authForm" >   
              <div className="authContent">
                  <span className="authtitle">Sign in to ATC</span> 

                  <div className="loginForm" >
                    <LogInForm  onSubmit={this.submit} />
                  </div> 

                  <div className="authText">
                    <span>New to ATC? <Link to="/signup" className="authtxt"> Create an account. </Link></span>
                  </div>  
                  {this.errorMessage()}
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

export default connect(mapStateToProps, { userLogin })(Login);