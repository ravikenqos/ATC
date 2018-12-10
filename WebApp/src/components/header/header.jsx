import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';
import * as Icon from 'react-feather';
import Menu from '../menu/menu.jsx';

import { getUser }  from './../../actions/user_action';

class Header extends Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem('user'));
        this.props.getUser(user.userId, user.id);
        this.state = {
            businessname:null,
            email:null,
        }       
    } 

    componentWillReceiveProps = (nxtprops) => {
        let hours = [];
        if(nxtprops.user) {
            let user = nxtprops.user.data[0];
          console.log("userdata", user);
          let data = user || null;
          if(data){
            localStorage.setItem('acc', JSON.stringify(data));
            this.setState({
              businessname:data.username || null,
              email:data.email || null,
            });
          }
          
        }
    }    
    render(){
        let name = String(this.state.businessname);
        return (
        <div className="header">
            <div className="useraccount">
                <ul className="appnav">
                   <li><div className="accinitial"><span>{this.state.businessname ? name.charAt(0) : '' }</span></div></li>     
                   <li><div className="accemail">{this.state.email}</div></li>
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

export default connect(mapStateToProps, { getUser })(Header);