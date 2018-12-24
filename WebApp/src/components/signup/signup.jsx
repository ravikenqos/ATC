import React, { Component } from 'react';
import SignupForm from './signupForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



import Grid from '@material-ui/core/Grid';

import './signup.css';
import backgroundImage from '../../assets/backgroundimage.jpg';
import logo from '../../assets/atclogo.png';

import { userSignup, userLogin, userActionStatus}  from './../../actions/authentication'

class SignUp extends Component {
  componentWillMount(){
    this.props.userActionStatus("signupError");
  }
    constructor(props) {
        super(props);
        this.state = {
          "email": null,
          "password": null
        }
        
      }
    
      submit = (values) => {
        this.setState({
          "email": values.email,
          "password": values.password,         
        })
        let val = { 
        "username": values.email,
        "email": values.email,
        "password": values.password,
        "emailVerified": true,}
        this.props.userSignup(val, this.props.history)


      }
      showSuccess = () => {
        if(this.props.signup){
          let values = {
            "email": this.state.email,
            "password": this.state.password,
          }
        // //  this.props.userActionStatus("signup");
          this.props.userLogin(values, this.props.history);
         }
      }
      errorMessage() {
        if (this.props.errorMessage) {
          this.props.userActionStatus("signup"); 
          return (
            <div className="info-red">
              {this.props.errorMessage}
             
            </div>
          );
          
        }
      }
    
      render() {
        this.showSuccess();
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
                      </div> 
                      <br/>
                      <div className="signupForm" >
                        <SignupForm  onSubmit={this.submit} />
                        {this.errorMessage()}
                      </div> 
    
                      <div className="authText">
                        <span>Already have an account? <Link to="/" className="authtxt"> Log in. </Link></span>
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
    return { 
      errorMessage: state.auth.signuperror,
      signup: state.auth.signup,
    };
  }
  
  export default connect(mapStateToProps, { userSignup, userLogin, userActionStatus })(SignUp);

