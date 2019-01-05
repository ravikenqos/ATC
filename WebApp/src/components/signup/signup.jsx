import React, { Component, Fragment  } from 'react';
import SignupForm from './signupForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import axios, { post } from 'axios';
import {toastr} from 'react-redux-toastr';
import Grid from '@material-ui/core/Grid';
import { object } from 'prop-types';

import { API_URL } from './../../actions/constants.jsx';
import './signup.css';
import backgroundImage from '../../assets/backgroundimage.jpg';
import logo from '../../assets/atclogo.png';
import ajaxloader from './../../assets/ajax-loader.gif';
import { userSignup, userLogin, userActionStatus, prefillEmail}  from './../../actions/authentication'


class SignUp extends Component {
  componentWillMount(){
    this.props.userActionStatus("signupError");
    this.props.prefillEmail(null);
  }
  

  constructor(props) {
      super(props);
      this.state = {
        "email": null,
        "password": null,
        "accesstoken":null
      }
      
  }

   componentDidMount = async() => {
    try{
          const toastrOptions = {
            timeOut: 2000,
            onHideComplete: () => {
              window.location.href = "/";
            },
        } 
        let urlQueryString = queryString.parse(this.props.location.search);
        if(this.isObj(urlQueryString)){
            this.setState({display:"block"})          
            let data = {
              "code": urlQueryString.code,
              "shop": urlQueryString.shop   
            }
            let response = await axios.post(`${API_URL}shopify/validateuser`, data);
            if(response.data.data.status === 0){
                this.setState({display:"none"});
                localStorage.setItem('shopifyuser', JSON.stringify(response.data.data));
                toastr.success('signup withyour email', 'Success');
                this.props.prefillEmail(response.data.data.email);
                this.setState({"accesstoken": response.data.data.accessToken})                
            }
            if(response.data.data.status === 1){
                this.setState({display:"none"});
                toastr.success('Login by tou mail id', 'Success', toastrOptions)
            }            
            if(response.data.data.status === 400){
                this.setState({display:"none"});
                toastr.error("error");
            }
        } 
    }catch(error){
      console.error(error);
     
    }
  }

  isObj  = (obj) =>{
      if(Object.keys(obj).length === 0){
        return false;
      } else {
        return true;
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
        this.props.userSignup(val, this.state.accesstoken, this.props.history)


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
          <Fragment>          
            <div className="loading" style={{display:this.state.display}}>
                <img className="loading-image" src={ajaxloader} alt="Loading..." />
            </div>          
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
                        <SignupForm  onSubmit={this.submit} email={this.state.email}/>
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
          </Fragment>
        )
      }
}

function mapStateToProps(state) {
    return { 
      errorMessage: state.auth.signuperror,
      signup: state.auth.signup,
    };
  }
  
  export default connect(mapStateToProps, { userSignup, userLogin, userActionStatus, prefillEmail})(SignUp);

