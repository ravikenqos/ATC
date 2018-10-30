import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import SideBarMenu from '../sidebarmenu/sideBarMenu';

class SideBar extends Component {
    render(){
        return (
            <Grid md={2} item className="sidebar">
                <div className="adminlogo">
                    <img src="http://localhost:3000/assets/atclightlogo.png"/>
                </div>
                <div className="appnavigations">
                    <SideBarMenu/>
                </div>    
            </Grid>    
        );
    }
}

export default SideBar