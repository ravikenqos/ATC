import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import SideBarMenu from '../sidebarmenu/sideBarMenu';
import logoLight from '../../assets/atclightlogo.png';

class SideBar extends Component {
    render(){
        return (
            <div className="sidebar">
                <div className="adminlogo">
                    <img src={logoLight}/>
                </div>
                <div className="appnavigations">
                <SideBarMenu/>
                </div>    
            </div>    
        );
    }
}

export default SideBar