import React, { Component } from 'react';

import './header.css';
import * as Icon from 'react-feather';

import Menu from '../menu/menu.jsx';

class Header extends Component {
    render(){
        return (
        <div className="header">
            <div className="useraccount">
                <div className="accinitial menu"><p>A</p></div>
                <div className="accemail menu"><span>ravikumarmmt@gmail.com</span></div>
                <div className="accmenu menu"><Menu /></div>
            </div>
        </div>
        );
    }
}

export default Header