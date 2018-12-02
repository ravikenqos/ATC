import React, { Component, Fragment } from 'react';
import * as Icon from 'react-feather';



import './../product/product.css';
import './store.css';
class Store extends Component {
    state = {  }
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
                        <input type="file" name="productimagefield" />
                        <p className="uploadFilename"></p> 
                    </div>
        
                <div className="productformctrl">
                    <div className="addproductfieldinfo">
                        <div className="productnamegroup inputgroup">
                            <input type="text" name="namefiled" className="namefiled producttxtfield" placeholder="Business Name" />
                            <div className="errmsg"></div> 
                        </div>
                        <div className="productnamegroup inputgroup">
                            <input type="text" name="tagline" className="tagline producttxtfield" placeholder="Tagline" />
                            <div className="errmsg"></div> 
                        </div>                        
                        <div className="producttextgroup inputgroup">
                            {/* <input type="text" name="producttextfield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" /> */}
                            <textarea name="storetxtfiled"  className="storetxtfiled producttxtfield" placeholder="Describe your company in 500 caracter or less"></textarea>
                            <div className="errmsg"></div> 
                        </div>
                    </div>
                </div>
                <div className="clearboth" ></div>
                <div className="bottominputs">
                    <div className="productnamegroup inputgroup">
                        <input type="text" name="storeurlfield" className="storeurlfield producttxtfield" placeholder="Enter Store URL http://" />
                        <div className="errmsg"></div> 
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="groupcell">
                    <p>What You sell?</p>
                    <div className="productnamegroup inputgroup">
                        <select name="cityfield" className="cityfield">
                            <option>city</option>
                        </select>
                        <div className="errmsg"></div> 
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="location">
                    <p>Add Your Location: </p>
                    <div className="locationone">  
                        <div className="adressonegrp inputgroup">
                            <input type="text" name="adressonefield" className="adressonefield" placeholder="Address line 1" />
                            <div className="errmsg"></div> 
                        </div>
                        <div className="citygrp inputgroup">
                            <select name="cityfield" className="cityfield">
                            <option>city</option>
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
                            <select name="statefield" className="statefield">
                            <option>State</option>
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
                    <p>Business Hour:</p>
                    <div className="productnamegroup inputgroup">
                            <select name="statefield" className="statefield">
                            <option>Pacific state Zone</option>
                            </select>
                        <div className="errmsg"></div> 
                    </div>
                </div>

                <div className="clearboth"></div>
                <div className="regioncell">
                    <p>Business Hour:</p>
                    <div className="zonefieldgrp inputgroup">
                            <select name="zonefield" className="zonefield">
                            <option>Pacific state Zone</option>
                            </select>
                        <div className="errmsg"></div> 
                    </div>
                </div>

                <div className="clearboth"></div>
                <div className="regioncell">
                    <p>Business Hour:</p>
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

                </div>
              </form>
            </div>
            </Fragment> 

         );
    }
}
 
export default Store;