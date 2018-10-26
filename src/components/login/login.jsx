import React from 'react';
import LogInForm from './logInForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import './login.css';

class Login extends React.Component {
  submit = (values) => {
   
    const user = {
        email: this.state.email,
        password: this.state.password,
    }
    console.log(values);
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
                  <h2>Sign in to ATC</h2> 

                  <div className="loginForm" >
                    <LogInForm  onSubmit={this.submit} />
                  </div> 

                  <div className="authText">
                    <span>New to ATC? <Link to="/signup" className="authtxt"> Create an account. </Link></span>
                  </div>  

              </div>    
            </div>
          </Grid>                  
        </Grid>
      </Grid>  
      
    )
  }
}

export default Login; 