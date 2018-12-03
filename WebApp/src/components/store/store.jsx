import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';


import { getCategories  }  from './../../actions/category';
import axios, { post } from 'axios';

import './../product/product.css';
import './store.css';
import stateData from '../../assets/data/states.json';
// import cityData from '../../assets/data/cities.json';

class Store extends Component {

    componentWillMount(){
        this.props.getCategories();
    }
    constructor(props) {
        super(props);
        this.state = {
            file:null,
            namefield:null,
            storename:null,
            tagline:null,
            storedescription:null,
            storeurl:null,
        }
    }

    
    onFormSubmit(e){
        e.preventDefault();

        if(!this.state.file){
            this.setState({
                storefileerror: "Please select .jpg or .png or .jpeg file",
                isError: true
            });     
        }else {
            this.setState({
                storefileerror: null,
                isError: false
            }); 
        }  

        if(!this.state.namefield){
            this.setState({
                namefielderror:true,
                namefieldmsg:"Please enter name",
                isError: true
            });     
        }else {
            if(this.state.namefield.length < 6 ){
                this.setState({
                    namefielderror:true,
                    namefieldmsg:"Please enter name greater than six character",
                    isError: true
                });        
            } else {
                this.setState({
                    namefieldmsg:'',
                    isError: false
                });
            }       
        }
        if(!this.state.tagline){
            this.setState({
                taglineerror:true,
                taglinemsg:"Please enter name",
                isError: true
            });     
        }else {
            if(this.state.tagline.length < 2 ){
                this.setState({
                    taglineerror:true,
                    taglinemsg:"Please enter name greater than six character",
                    isError: true
                });        
            } else {
                this.setState({
                    taglineerror:false,
                    taglinemsg:'',
                    isError: false
                });
            }       
        }         
        if(!this.state.storedescription){
            this.setState({
                storetextfielderror:true,
                storetextfieldmsg:"Please enter store description",
                isError: true
            });         
        } else {
            if(this.state.storedescription.length < 60 ){ 
                this.setState({
                    storetextfielderror:true,
                    storetextfieldmsg:"Please enter store description greater than sixty character",
                    isError: true
               });
           } else {
            this.setState({
                storetextfielderror:false,
                storetextfieldmsg:'',
                isError: false
            }); 
           }
        }
        if(!this.state.storeurl){
            this.setState({
                storeurlfielderror:true,
                storetextfieldmsg:"Please enter store url",
                isError: true
            });         
        } else {
            if(this.isValidUrl(this.state.storeurl) ){ 
                this.setState({
                    storeurlfielderror:true,
                    storeurlfieldmsg:"Please enter valid store url",
                    isError: true
                });
            } else {
            this.setState({
                storeurlfielderror:false,
                storeurlfieldmsg:'',
                isError: false
            }); 
           }
        }        
    } 

    handleChange(e) {
        let target = e.target;
        if(target.name === 'storeimagefield'){
            let fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if(fileTypes.indexOf(target.files[0].type) < 0)  {
                this.setState({
                    storefileerror: "Please select .jpg or .png or .jpeg file",
                    storeimagename:target.files[0].name,
                    isError: false
                });             
            } else if(target.files[0]){
                this.setState({
                    storefileerror: "",
                    storeimagename:target.files[0].name,
                    file: target.files[0],
                }); 
            }  
            
        } //End of file

        if(target.name === 'namefield'){
            console.log("namefield", target.value);
            if(target.value != '' || target.value != null ){
                if(target.value.length < 6 ){
                    this.setState({
                        namefielderror:true,
                        namefieldmsg:"Please enter name greater than six character",
                        isError: true
                    });        
                } else {
                    this.setState({
                        namefielderror:false,
                        namefieldmsg:'',
                        storename: target.value,
                        isError: false
                    });
                }            
            }      
        }

        if(target.name === 'tagline'){
            if(target.value != '' || target.value != null ){
                if(target.value.length < 6 ){
                    this.setState({
                        taglineerror:true,
                        taglinemsg:"Please enter tagline more than two character",
                        isError: true
                    });        
                } else {
                    this.setState({
                        taglineerror:false,
                        taglinemsg:'',
                        tagline: target.value,
                        isError: false
                    });
                }            
            }      
        }
        if(target.name === 'storetextfield'){
            //console.log("productnamefield", target.value.length);
            if(target.value != '' || target.value != null ){
                if(target.value.length < 60 ){ 
                    this.setState({
                        storetextfielderror:true,
                        storetextfieldmsg:"Please enter store description greater than sixty character",
                        isError: true
                    });
                } else {
                    this.setState({
                        storetextfielderror:false,
                        storetextfieldmsg:'',
                        storedescription: target.value,
                        isError: false
                    }); 
                }
            }      
        }
        if(target.name === 'storeurlfield'){
            console.log("storeurlfield", target.value);
            if(target.value != '' || target.value != null ){
                if(this.isValidUrl(target.value) ){ 
                    this.setState({
                        storeurlfielderror:true,
                        storeurlfieldmsg:"Please enter valid store url",
                        isError: true
                    });
                } else {
                    this.setState({
                        storeurlfielderror:false,
                        storeurlfieldmsg:'',
                        storeurl: target.value,
                        isError: false
                    }); 
                }
            }      
        }

    }    

    isValidUrl = (url) => {
        let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        let res = url.match(regexp);
        if (!res){
            return true;
        } else {
            return false;
        }
    }

    renderState = () => {
        let states = [];
        if(stateData){
            let data = stateData.states;
            data.forEach((item) =>{
                if(item.country_id == 231){
                    states.push(<option value={item.id}>{item.name}</option>)
                }    
            });
        }
        return states;
    }

    renderCity(e){
        // if(e){
        //     let cities = [];
        //     if(cityData){
        //         let data = cityData.cities;
        //         console.log("states", data);
        //         data.forEach((item) =>{
        //             if(item.state_id == e.target.value){
        //                 cities.push(<option value={item.id}>{item.name}</option>)
        //             }    
        //         });
        //     }
        //     if(cities.length > 1) {
        //         return cities;         
        //     }  
        // }
    }

    render() { 
        return ( 
                <Fragment>
                <div className="pagetitle">
                    <div className="titleicon">
                         <i class="fa fa-briefcase fa-2x fonticon" aria-hidden="true"></i>
                    </div>
                    <div className="titletext">
                        Business Profile 
                    </div>
                </div>
                <div className="clearboth"></div>
        
                <div className="bulkuploadform">
                
                <div className="bulkuploadtitle">
                    Add your Business name, logo, tagline, description and Website
                </div>
              
                <form onSubmit={this.onFormSubmit}>
                <div className="bulkinput">
                    <div className="bulkuploadfield">
                        <p>Add Image</p>        
                        <div class="choose_file">
                            <span><Icon.Upload  color="blue" size={100} /></span>
                        </div>   
                        <input type="file" name="storeimagefield" />
                        <p className="uploadFilename">{this.state.storeimagename ? this.state.storeimagename : ''}</p> 
                    </div>
        
                <div className="productformctrl">
                    <div className="addproductfieldinfo">
                        <div className="productnamegroup inputgroup">
                            <input type="text" name="namefield" className="namefield producttxtfield" onBlur={(e)=>{this.handleChange(e)}} placeholder="Business Name" />
                            <div className="errmsg">{this.state.namefielderror ? this.state.namefieldmsg : ''}</div> 
                        </div>
                        <div className="productnamegroup inputgroup">
                            <input type="text" name="tagline" className="tagline producttxtfield" onBlur={(e)=>{this.handleChange(e)}} placeholder="Tagline" />
                            <div className="errmsg">{this.state.taglineerror ? this.state.taglinemsg : ''}</div> 
                        </div>                        
                        <div className="producttextgroup inputgroup">
                            {/* <input type="text" name="producttextfield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" /> */}
                            <textarea name="storetextfield"  className="storetextfield oducttxtfield" onBlur={(e)=>{this.handleChange(e)}} placeholder="Describe your company in 500 character or less"></textarea>
                            <div className="errmsg">{this.state.storetextfielderror ? this.state.storetextfieldmsg : ''}</div> 
                        </div>
                    </div>
                </div>
                <div className="clearboth" ></div>
                <div className="bottominputs">
                    <div className="productnamegroup inputgroup">
                        <input type="text" name="storeurlfield" className="storeurlfield producttxtfield"  onBlur={(e)=>{this.handleChange(e)}} placeholder="Enter Store URL http://" />
                        <div className="errmsg">{this.state.storeurlfielderror ? this.state.storeurlfieldmsg : ''}</div> 
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="groupcell">
                    <p className="storetitle">What You sell?</p>
                    <div className="productnamegroup inputgroup">
                        <select name="categoryfield" className="categoryfield">
                            <option>Select Your Business Type</option>
                        </select>
                        <div className=" "></div> 
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="location">
                    <p  className="storetitle">Add Your Location: </p>
                    <div className="locationone">  
                        <div className="adressonegrp inputgroup">
                            <input type="text" name="adressonefield" className="adressonefield" placeholder="Address line 1" />
                            <div className="errmsg"></div> 
                        </div>
                        <div className="citygrp inputgroup">
                            <select name="cityfield" className="cityfield">
                                <option value="">Select City</option>
                                {/* { this.renderCity() } */}
                            </select>
                            <div className="errmsg"></div> 
                        </div>
                    </div>
                    <div className="clearboth"></div>
                    <div className="locationtwo">  
                        <div className="adresstwogrp inputgroup">
                            <input type="text" name="adresstwofield" className="adresstwofield" placeholder="Address line 2" />
                            <div className="errmsg"></div> 
                        </div>
                        <div className="stategrp inputgroup">
                            <select name="statefield" className="statefield"  onChange={(e)=>{this.renderCity(e)}} >
                            <option value="">Select State</option>
                            { this.renderState() }
                            </select>
                            <div className="errmsg"></div> 
                        </div>
                    </div>
                    <div className="clearboth"></div>
                    <div className="locationthree">  
                        <div className="phonenogrp inputgroup">
                            <input type="text" name="phonenofield" className="phonenofield" placeholder="Phone number" />
                            <div className="errmsg"></div> 
                        </div>
                        <div className="postalcodegrp inputgroup">
                            <input type="text" name="postalcodefield" className="postalcodefield" placeholder="Postal Code" />
                            <div className="errmsg"></div> 
                        </div> 
                    </div>                    
                </div>   
                <div className="clearboth"></div>
                <div className="regioncell">
                    <p  className="storetitle" >Business Hour:</p>
                    <div className="zonefieldgrp inputgroup">
                            <select name="zonefield" className="zonefield">
                            <option>Pacific state Zone</option>
                            </select>
                        <div className="errmsg"></div> 
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="hourcell">
                    <div className="mondayrow">
                            <span className="monday day">
                            <input type="checkbox" className="mondaycheckfield" name="mondaycheckfield"  />
                            <label for="mondaycheckfield"> Monday</label>
                            </span>
                            <select name="mfromfield" className="mfromfield dayfromfield">
                            <option>10.00AM</option>
                            </select>
                            <select name="mtofield" className="mtofield daytofield">
                            <option>6.00PM</option>
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="tuesdayrow ">
                            <span className="tuesday day">
                            <input type="checkbox" className="tuesdaycheckfield" name="tuesdaycheckfield"  />
                            <label for="tuesdaycheckfield">Tuesday</label>
                            </span>
                            <select name="tufromfield" className="tufromfield dayfromfield">
                            <option>10.00AM</option>
                            </select>
                            <select name="tutofield" className="tutofield daytofield">
                            <option>6.00PM</option>
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="wednesdayrow ">
                            <span className="wednesday day">
                            <input type="checkbox" className="wednesdaycheckfield" name="wednesdaycheckfield"  />
                            <label for="wednesdaycheckfield">Wednesday</label>
                            </span>
                            <select name="wedfromfield" className="wedfromfield dayfromfield">
                            <option>10.00AM</option>
                            </select>
                            <select name="wedtofield" className="wedtofield daytofield">
                            <option>6.00PM</option>
                            </select>                            
                        <div className="errmsg"></div> 
                    </div> 
                    <div className="thursdayrow ">
                            <span className="thursday day">
                            <input type="checkbox" className="thursdaycheckfield" name="thursdaycheckfield"  />
                            <label for="thursdaycheckfield">Thursday</label>
                            </span>
                            <select name="thfromfield" className="thfromfield dayfromfield">
                            <option>10.00AM</option>
                            </select>
                            <select name="thtofield" className="thtofield daytofield">
                            <option>6.00PM</option>
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>
                    <div className="fridayrow ">
                            <span className="friday day">
                            <input type="checkbox" className="fridaycheckfield" name="fridaycheckfield"  />
                            <label for="fridaycheckfield">Friday</label>
                            </span>
                            <select name="ffromfield" className="ffromfield dayfromfield">
                            <option>10.00AM</option>
                            </select>
                            <select name="ftofield" className="ftofield daytofield">
                            <option>6.00PM</option>
                            </select>                            
                        <div className="errmsg"></div> 
                    </div>                                                                                 
 
                <div className="saturdayrow ">
                            <span className="saturday day">
                            <input type="checkbox" className="saturdaycheckfield" name="saturdaycheckfield"  />
                            <label for="saturdaycheckfield">Saturday</label>
                            </span>
                            <select name="safromfield" className="safromfield dayfromfield">
                            <option>10.00AM</option>
                            </select>
                            <select name="satofield" className="satofield daytofield">
                            <option>6.00PM</option>
                            </select>                            
                        <div className="errmsg"></div> 
                </div> 

                <div className="sundayrow ">
                            <span className="sunday day">
                            <input type="checkbox" className="sundaycheckfield" name="sundaycheckfield"  />
                            <label for="sundaycheckfield">Sunday</label>
                            </span>
                            <select name="sufromfield" className="sufromfield dayfromfield">
                            <option>10.00AM</option>
                            </select>
                            <select name="sutofield" className="sutofield daytofield">
                            <option>6.00PM</option>
                            </select>                            
                        <div className="errmsg"></div> 
                </div> 
                </div>
                <div className="clearboth" ></div>
                <div className="storesubmitField">
                    <button type="submit" className="storesubmit" >Save</button>
                    <div className="processmsg"></div>
                    <div className="submiterr errmsg">
                    {this.state.storefileerror ? this.state.storefileerror : ''}
                    </div> 
                </div> 

                </div>
              </form>
            </div>
            </Fragment> 

         );
    }
}
 
export default connect(null, { getCategories })(Store);