import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

import './addyourproducts.css';

class AddYourProducts extends Component {
    render() {
        return(
            <Fragment>
            <div className="pagetitle">
              <div className="titleicon">
                <Icon.Box size={30} color="white"/>
              </div>
              <div className="titletext">
                Add Your Products
              </div>
            </div>
             <div className="clearboth"></div>
              <div className="bulkuploadform">
                    <div className="addyourprodtitle">How would you like to add your products?</div> 
                    <br/>
                    <br/>   
                    <div className="icons">
                        <div className="storeicongrp bulkicon icongrp">
                            <Link to="/addproduct">
                                <div className="storeicon icon">
                                    <div className="faicon"><i class="fa fa-plus fa-6x storefonticon facolor" aria-hidden="true"></i></div>
                                    <p>One at Time</p>
                                </div>
                            </Link>
                        </div>

                        <div className="storeicongrp icongrp">
                            <Link to="/productbulkupload">
                                <div className="storeicon icon">
                                    <div className="faicon"><i class="fa fa-list fa-6x storefonticon facolor" aria-hidden="true"></i></div>
                                    <p>In Bulk</p>
                                </div>
                            </Link>
                        </div>
                               
                    </div>
                    <div className="clearboth"></div>
                    <div className="bottomspace"></div>                   
              </div>

           </Fragment> 
        )
    }


}

export default AddYourProducts;