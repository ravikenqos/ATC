import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';
import * as Icon from 'react-feather';
import Menu from '../menu/menu.jsx';

import {withRouter} from "react-router-dom";

import { getUser }  from './../../actions/user_action';

class Header extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('user'));
        if(user){
            let userid =  user.userId || user.id;
            this.props.getUser(userid);
        } 
        this.state = {
            businessname:null,
            email: null
        }     
    } 
    componentWillReceiveProps = (nxtprops) => {
        if(nxtprops.user) {
            let user = nxtprops.user.data[0];
            let data = user || null;
            if(!data){
                this.props.history.push("/logout");
            } else {    
                localStorage.setItem('acc', JSON.stringify(data));
                this.setState({
                businessname:data.username || null,
                email:data.email || null,
                });
            }
        }
    }    

    render(){
        let name = this.state.businessname ? String(this.state.businessname) : null;
        return (
        <div className="header">
            <div className="useraccount">
                <ul className="appnav">
                   <li><div className="accinitial"><span>{this.state.businessname ? name.charAt(0) : '' }</span></div></li>     
                   <li><div className="accemail">{this.state.email ? this.state.email : ''}</div></li>
                   <li><div className="accmenu"><Menu/></div></li>
                </ul>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
          user: state.user.data,
          usererror: state.user.usererror,
    
      };
  }

export default connect(mapStateToProps, { getUser })(withRouter(Header));