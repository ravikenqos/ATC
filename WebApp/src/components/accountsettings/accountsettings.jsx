import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import {toastr} from 'react-redux-toastr';
import { getUser, saveUser }  from './../../actions/user_action';

import './accountsettings.css';

class AccountSettings extends Component {

    constructor(props) {
      super(props);
      const user = JSON.parse(localStorage.getItem('user'));
      this.props.getUser(user.userId, user.id);

      this.state = {
        user_id: user.userId,
        businessname:null,
        email:null,
        newemail:null,
        confirmemail:null,
        emailmatch:null,
        password:null,
        confirmpassword:null,
        newpassword:null,
      }

    }
    componentWillReceiveProps = (nxtprops) => {
      let hours = [];
      if(nxtprops.user) {
        let data = nxtprops.user || {};
        if(data){
          this.setState({
            businessname:data.username || null,
            email:data.email || null,
          });
        }
      }
    }

    onFormSubmit = (e)=>{
        e.preventDefault();
        if(!this.state.businessname){
            this.setState({
                namefielderror:true,
                namefieldmsg:"Please enter business name",
                isError: true
            });     
        }else {
            if(this.state.businessname.length < 6 ){
                this.setState({
                    namefielderror:true,
                    namefieldmsg:"Please enter name greater than six character",
                    isError: true
                });        
            } else {
                this.setState({
                    namefieldmsg:'',
                    isError: false
                });
            }       
        }
        if(this.state.newemail && this.state.confirmemail){
            if(this.state.newemail !== this.state.confirmemail){
                this.setState({
                    emailmatcherr:true,
                    emailmatchmsg:'Emails are doesn\'t match! ',
                    isError: false
                });                
            } else {
                this.setState({
                    emailmatcherr:false,
                    emailmatchmsg:'',
                    isError: false
                });                
            }
        }

        if(this.state.newpassword && this.state.confirmpassword){
            if(this.state.newpassword !== this.state.confirmpassword){
                this.setState({
                    passworderr:true,
                    passwordmsg:'password are doesn\'t match! ',
                    isError: false
                });                
            } else {
                this.setState({
                    passworderr:false,
                    passwordmsg:'',
                    isError: false
                });                
            }
        }
        const formData = new FormData();
        if(this.businessname && this.state.newemail && this.state.newpassword){
            formData.append('user_id', this.state.user_id);
            formData.append('businessname',this.state.businessname);
            formData.append('newemail',this.state.newemail);
            formData.append('newpassword',this.state.newpassword); 
        } else if(this.state.businessname && this.state.newemail){
            formData.append('user_id', this.state.user_id);
            formData.append('businessname',this.state.businessname);
            formData.append('newemail',this.state.newemail);
            formData.append('newpassword',this.state.newpassword); 
        } else if(this.state.businessname && this.state.newpassword){
            formData.append('user_id', this.state.user_id);
            formData.append('businessname',this.state.businessname);
            formData.append('newemail',this.state.newemail);
            formData.append('newpassword',this.state.newpassword); 
        } else if(this.state.businessname){
            formData.append('user_id', this.state.user_id);
            formData.append('businessname',this.state.businessname);
            formData.append('newemail',this.state.newemail);
            formData.append('newpassword',this.state.newpassword); 
        }
        this.props.saveUser(formData);       
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
            if(target.name === 'newemail'  && target.value.length > 0){
                let email = target.value
                if(!this.isValidMail(email)){ 
                    this.setState({
                        newemailerror:true,
                        newemailmsg:"Invalid mail id",
                        isError: true
                    });                     
                } else {
                    this.setState({
                        newemailerror:false,
                        newemailmsg:"",
                        isError: false,                        
                        newemail: email,
                    });
                }
      
            }
            if(target.name === 'confirmemail'  && target.value.length > 0){
                let email = target.value
                if(!this.isValidMail(email)){ 
                    this.setState({
                        confirmemailerror:true,
                        confirmemailmsg:"Invalid mail id",
                        isError: true
                    });                     
                } else {
                    this.setState({
                        confirmemailerror:false,
                        confirmemailmsg:"",
                        isError: false,                        
                        confirmemail: email,
                    });
                }      
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
             // this.props.changeProductUpdateStatus();
            },
        } 
         if(this.props.usersave){
           toastr.success('Update success!');
         }
     
    }
    showFailure = () => {
        if(this.props.usererror){
          toastr.error('Error to get user!');
        }
        if(this.props.saveusererror){
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
                        <input type="password" name="currentpassword" className="currentpassword acctxtfield"  placeholder="Current Password" />
                        <div className="errmsg"></div> 
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

export default connect(mapStateToProps, { getUser, saveUser })(AccountSettings);