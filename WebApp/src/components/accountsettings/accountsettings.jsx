import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import {toastr} from 'react-redux-toastr';
import { getUser, saveUser, changeAccStatus }  from './../../actions/user_action';

import './accountsettings.css';
let userid = null;
let mysate = null;
class AccountSettings extends Component {

    componentWillMount(){
        let user = JSON.parse(localStorage.getItem('user'));
        if(user){
            userid =  user.userId;
            this.props.getUser(userid);
            this.setState({
                    user_id: userid,
                    accesstoken: user.id
                });
        } 
    }   

    constructor(props) {
      super(props);

      this.state = {
        user_id: null,
        businessname:null,
        email:null,
        newemail:null,
        confirmemail:null,
        emailmatch:null,
        currentpassword:null,
        confirmpassword:null,
        newpassword:null,
        isError:null,
        accesstoken:null,
        emailmatcherr:false
      }

    }
    componentWillReceiveProps = (nxtprops) => {
        if(nxtprops.user) {
            let data = nxtprops.user.data[0] || {};
            if(data){
            this.setState({
                businessname:data.username || null,
                email:data.email || null,
            });
            }
        }
        if(nxtprops.usersave){
           if(nxtprops.usersave.data.email){
                this.setState({
                    confirmemailerror:true,
                    confirmemailmsg:"Email already exist!",
                    isError: true,                        
                });                
            } else {
                this.setState({
                    confirmemailerror:false,
                    confirmemailmsg:"",
                    isError: false,                        
                });                 
            } 
            if(nxtprops.usersave.data.password){
               if(!nxtprops.usersave.data.user) {
                    this.setState({
                        currentpassworderror:true,
                        currentpasswordmsg:"Invalid Currentpassword",
                        isError: true,                        
                    });
                }                
            } else {
                this.setState({
                    currentpassworderror:false,
                    currentpasswordmsg:"",
                    isError: false,                        
                });                 
            }  

        }

    }
    
    onFormSubmit = (e)=>{
        let emailerr = false;
        let passworderr = false;
        e.preventDefault();
        if(!this.state.businessname){
            this.setState({
                namefielderror:true,
                namefieldmsg:"Please enter business name",
                isError: true
            });     
        }else {

                this.setState({
                    namefieldmsg:'',
                    isError: null
                });

        }

        if(this.state.currentpassword != ''){
                this.setState({
                    currentpassworderror:false,
                    currentpasswordmsg:"",
                    isError: null, 
                });                
        } 
        

       if(this.state.newemail && this.state.confirmemail){
            if(this.state.newemail !== this.state.confirmemail){
                this.setState({
                    emailmatcherr:true,
                    emailmatchmsg:'Emails are doesn\'t match! ',
                    isError: true
                });
                emailerr = true;                
            } else {
                emailerr = false;  
                this.setState({
                    emailmatcherr:false,
                    emailmatchmsg:'',
                    isError: null
                });                
            }
        }        


        if(this.state.newpassword && this.state.confirmpassword){
            if(this.state.newpassword !== this.state.confirmpassword){
                this.setState({
                    passworderr:true,
                    passwordmsg:'passwords are doesn\'t match! ',
                    isError: true
                });
                passworderr = true;                
            } else {
                passworderr = false;
                this.setState({
                    passworderr:false,
                    passwordmsg:'',
                    isError: null
                });                
            }
        }
        let data = {};
        if(!this.state.newemailerror && !this.state.newpassworderror && !emailerr && !passworderr){
               data.user_id = this.state.user_id;
                data.businessname = this.state.businessname;
                data.currentpassword = this.state.currentpassword;
                data.newemail = this.state.newemail;
                data.newpassword = this.state.newpassword;
                data.accesstoken = this.state.accesstoken
                this.props.saveUser(data);
        }
    }  


    isValidMail = (email) => {
        let regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let res = regexp.test(email);
        if (!res){
            return false;
        } else {
            return true;
        }       
    }

    handleChange = (e)=>{
        if(e){
            let target = e.target;
            if(target.name === 'namefield' && target.value.length > 0){
                this.setState({
                    businessname: target.value,
                });      
            }
            if(target.name === 'newemail'){
                let email = target.value
                if(email.length > 0 ){
                    if(!this.isValidMail(email)){ 
                        this.setState({
                            newemailerror:true,
                            newemailmsg:"Invalid Email",
                            isError: true
                        });                     
                    } else {
                        this.setState({
                            newemailerror:false,
                            newemailmsg:"",
                            isError: null,                        
                            newemail: email,
                        });
                    }
                }
      
            }
            if(target.name === 'confirmemail' ){
                let email = target.value
                if(email.length > 0 ){
                    if(!this.isValidMail(email)){ 
                        this.setState({
                            confirmemailerror:true,
                            confirmemailmsg:"Invalid Email",
                            isError: true
                        });                     
                    } else {
                        this.setState({
                            confirmemailerror:false,
                            confirmemailmsg:"",
                            isError: null,                        
                            confirmemail: email,
                        });
                    }
                }      
            }

            if(target.name === 'currentpassword' && target.value.length > 0){
             
                    this.setState({
                        currentpassworderror:false,
                        currentpasswordmsg:"",
                        isError: null, 
                        currentpassword: target.value
                    });
                
            }            

            if(target.name === 'newpassword' && target.value.length > 0){
                if(target.value.length < 5 ){
                    this.setState({
                        newpassworderror:true,
                        newpasswordmsg:"Please enter  more than five character",
                        isError: true
                    });        
                } else {                
                    this.setState({
                        newpassworderror:false,
                        newpasswordmsg:"",
                        isError: null, 
                        newpassword: target.value
                    });
                }
            }
            if(target.name === 'confirmpassword' && target.value.length > 0){
                if(target.value.length < 5 ){
                    this.setState({
                        confirmpassworderror:true,
                        confirmpasswordmsg:"Please enter  more than five character",
                        isError: true
                    });        
                } else {                  
                    this.setState({
                        confirmpassworderror:false,
                        confirmpasswordmsg:"",
                        isError: null, 
                        confirmpassword: target.value
                    });
                }         
            }

        }//event if condition
    }
    showSuccess = () => {
        const toastrOptions = {
            timeOut: 2000,
            onHideComplete: () => {
                window.location.reload();
            },
        } 

        if(this.props.usersave){
            if(this.props.usersave.data.user){
                this.props.changeAccStatus("saveUser");
                toastr.success('Update account settings!', 'Success', toastrOptions);
            }   
         }    
     
     
    }
    showFailure = () => {
        if(this.props.usererror){
          toastr.error('Error to get user!');
        }
        if(this.props.saveusererror){
            this.props.changeAccStatus("saveuserError");
            toastr.error('Update error!');
          }        
    } 
    render() {
      this.showSuccess(); 
      this.showFailure();
        return(
            <Fragment>
            <div className="pagetitle">
              <div className="titleicon">
                <Icon.Box size={30} color="white"/>
              </div>
              <div className="titletext">
                Account Settings
              </div>
            </div>
             <div className="clearboth"></div>
    
              <div className="bulkuploadform">
              <form onSubmit={this.onFormSubmit}>
              <div className="basicinformation">
                    <p className="acctitle">Basic Information</p>
                    <div className="basicinfogrp accgroup">
                        <input type="text" name="namefield" className="namefield acctxtfield" onChange={(e)=>{this.handleChange(e)}} placeholder="Business Name" value={this.state.businessname} />
                        <div className="errmsg">{this.state.namefielderror ? this.state.namefieldmsg : ''}</div> 
                    </div>

                </div>

                <div className="clearboth" ></div> 

                <div className="emailcontainer">
                    <p className="acctitle">Change Email</p>
                    <div className="currentemailgrp accgroup">
                        <input type="text" name="currentemail" className="currentemail acctxtfield"  placeholder="Current Email Address"  value={this.state.email}/>
                        <div className="errmsg"></div> 
                    </div>
                    <div className="newemailgrp accgroup">
                        <input type="text" name="newemail" className="newemail acctxtfield" onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="New Email Address" />
                        <div className="errmsg">{this.state.newemailerror ? this.state.newemailmsg : ''}</div> 
                    </div>
                    <div className="confirmemailgrp accgroup">
                        <input type="text" name="confirmemail" className="confirmemail acctxtfield" onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Confirm Address" />
                        <div className="errmsg">{this.state.confirmemailerror ? this.state.confirmemailmsg : ''}</div> 
                        <div className="errmsg">{this.state.emailmatcherr ? this.state.emailmatchmsg : ''}</div> 
                    </div>                    
                </div>

                <div className="clearboth" ></div>  

                <div className="passwordcontainer">
                    <p className="acctitle">Change Password</p>
                    <div className="passwordgrp accgroup">
                        <input type="password" name="currentpassword" className="currentpassword acctxtfield"  onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Current Password" />
                        <div className="errmsg">{this.state.currentpassworderror ? this.state.currentpasswordmsg : ''}</div> 
                    </div>
                    <div className="newpasswordgrp accgroup">
                        <input type="password" name="newpassword" className="newpassword acctxtfield" onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="New Password" />
                        <div className="errmsg">{this.state.newpassworderror ? this.state.newpasswordmsg : ''}</div> 
                    </div>
                    <div className="confirmpasswordgrp accgroup">
                        <input type="password" name="confirmpassword" className="confirmpassword acctxtfield" onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleChange(e)}} placeholder="Confirm Password" />
                        <div className="errmsg">{this.state.confirmpassworderror ? this.state.confirmpasswordmsg : ''}</div> 
                        <div className="errmsg">{this.state.passworderr ? this.state.passwordmsg : ''}</div> 
                    </div>                    
                </div>
                <div className="clearboth" ></div>
                <div className="accsubmitField">
                    <button type="submit" className="accsubmit" >Save</button>
                    <div className="processmsg"></div>
                    <div className="submiterr errmsg"></div> 
                </div> 
                </form>          
              </div>
           </Fragment> 
        )
    }
}

function mapStateToProps(state) {
  return {
        user: state.user.data,
        usererror: state.user.usererror,
        usersave: state.user.save,
        saveusererror: state.user.saveusererror,        
    };
}

export default connect(mapStateToProps, { getUser, saveUser, changeAccStatus })(AccountSettings);