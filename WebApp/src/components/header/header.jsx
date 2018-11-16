import React, { Component } from 'react';

import './header.css';
import * as Icon from 'react-feather';

class Header extends Component {
    render(){
        return (
        <div className="header">
            <div className="useraccount">
                <span className="accinitial">A</span>
                <span className="accemail">name@mail.com</span>
                <span className="accsettings"></span>
            </div>
        </div>
        );
    }
}

export default Header