import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';

import './addyourproducts.css';
import shopifylogo from './../../assets/shopifylogo.png';
import ajaxloader from './../../assets/ajax-loader.gif';
import { API_URL } from './../../actions/constants.jsx';
class AddYourProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          "display": 'none',
        }
        
    }
    syncWithShopity = async () => {
        try{
            this.setState({display:"block"})
            let loggedUser = JSON.parse(localStorage.getItem('acc'));
            let storeid = loggedUser.storeid;
            let response = await axios.post(`${API_URL}shopify/products`, {storeid :storeid});
            console.log(response);
            if(response.data.data.status == 200){
                this.setState({display:"none"});
                toastr.success('Success!', 'Success');
            } else if(response.data.data.status == 400){
                throw "Error!";
            }
           
        } catch(err) {
            console.error(err);
            
        }   
    }

    render() {
        return(
         
            <Fragment>
            <div className="loading" style={{display:this.state.display}}>
                <img className="loading-image" src={ajaxloader} alt="Loading..." />
            </div>
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
                                    <p>One at a time</p>
                                </div>
                            </Link>
                        </div>

                        <div className="storeicongrp icongrp">
                            <Link to="/productbulkupload">
                                <div className="storeicon icon">
                                    <div className="faicon"><i class="fa fa-list fa-6x storefonticon facolor" aria-hidden="true"></i></div>
                                    <p>Bulk upload</p>
                                </div>
                            </Link>
                        </div>
                        <div className="storeicongrp shopifyicon icongrp" onClick={ (e)=>{this.syncWithShopity()} }>
                                <div className="storeicon icon">
                                    <div className="faicon"><img className="shopifylogo" src={shopifylogo} alt="Shopify" /></div>
                                    <p>Sync with Shopify</p>
                                </div>
                        </div>
                    </div>
                    <div className="clearboth"></div>
                    <div className="bottomspace"></div>  
                    <div className="clearboth"></div>                 
              </div>

           </Fragment> 
        )
    }


}

export default AddYourProducts;