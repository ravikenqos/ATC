import React from 'react';
import LogInForm from './logInForm';
import { Grid, Row, Col, Image, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import './login.css';

class Login extends React.Component {
  submit = (values) => {
    alert("submitted");
    console.log(values);
  }
  render() {
    const image_url = './assets/backgorundimage.jpg';
    return (
       <Grid>
         
        <div className="authContainer">
          <div className="row">
          <Col md="6" className="authLeftCoulmn">
              <div className="appLogo">
                <Image src="./assets/atclogo.png"/>
              </div>
          </Col>
          <Col md="6" className="authRightCoulmn">
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
          </Col>

          </div>           

        </div>
      </Grid>  
      
    )
  }
}

export default Login; 