import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

import './dashboard.css';

class Dashboard extends Component {


    render() {
        return(
            <Fragment>
            <div className="pagetitle">
              <div className="titleicon">
                <Icon.Box size={30} color="white"/>
              </div>
              <div className="titletext">
                Dashboard
              </div>
            </div>
             <div className="clearboth"></div>
    
              <div className="bulkuploadform bgform">
            
              <div className="icons">

                <div className="storeicon icon">
                    <Link to="/store">
                    <i class="fa fa-briefcase fa-2x storefonticon " aria-hidden="true"></i>
                        <p>Business Profile</p>
                    </Link>
                </div>

                <div className="accicon icon">
                    <Link to="/accountsettings">
                    <Icon.Users size={30} color="blue"/>
                        <p>Account Settings</p>
                    </Link>
                </div>

  
                

                </div>



              </div>
    
           </Fragment> 
        )
    }


}

export default Dashboard;