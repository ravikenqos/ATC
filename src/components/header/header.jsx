import React, { Component } from 'react';

import './header.css';

class Header extends Component {
    render(){
        return (
        <div className="header">
            <div className="useraccount">
                name@mail.com
            </div>
        </div>
        );
    }
}

export default Header