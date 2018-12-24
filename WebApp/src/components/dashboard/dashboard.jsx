import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

import './dashboard.css';
import checkbox from '../../assets/checkbox.png';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state ={
            storeid:null
        }
    }
    componentWillReceiveProps(nextProps, nextState){
        if(nextProps.user) {
            let user = nextProps.user.data[0];
                this.setState({
                    storeid:user.storeid,
                });
        }
    }
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
                        <div className="storeicongrp icongrp">
                            <Link to="/store">
                                <div className="storeicon icon">
                                    <div className="faicon"><i class="fa fa-briefcase fa-6x storefonticon facolor" aria-hidden="true"></i></div>
                                    {this.state.storeid ? 
                                    <img src={checkbox} />
                                    :''}
                                    <p>Business Profile</p>
                                </div>
                            </Link>
                        </div>

                        <div className="storeicongrp icongrp">
                            <Link to="/accountsettings">
                                <div className="storeicon icon">
                                    <div className="faicon"><i class="fa fa-user fa-6x storefonticon facolor" aria-hidden="true"></i></div>
                                    <p>Account Settings</p>
                                </div>
                            </Link>
                        </div>

                        <div className="storeicongrp icongrp">
                            <Link to="/addyourproducts">
                                <div className="storeicon icon">
                                    <div className="faicon"><i class="fa fa-cubes fa-6x storefonticon facolor" aria-hidden="true"></i></div>
                                    <p>Add Products</p>
                                </div>
                            </Link>
                        </div>                                
                    </div>
              </div>
    
           </Fragment> 
        )
    }


}

function mapStateToProps(state) {
    return {
          user: state.user.data,
          usererror: state.user.usererror,
      };
}

export default connect(mapStateToProps, null)(Dashboard);