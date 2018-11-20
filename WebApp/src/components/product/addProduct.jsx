import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { addProductAction  }  from './../../actions/product_action'

import './product.css';
import * as Icon from 'react-feather';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SimpleModalWrapped from './SimpleModal'

class AddProduct extends Component {

  constructor(props) {
    super(props);
    this.state ={
        file: null,
        productName: null,
        productdescription: null,
        productprice: null,
        isError: false
    }
     this.onFormSubmit = this.onFormSubmit.bind(this)
    // this.onChange = this.onChange.bind(this)
  }
 onFormSubmit(e){
     e.preventDefault() // Stop form submit
       const formData = new FormData();
       formData.append('store_id',210);
       formData.append('title',this.state.productName);
       formData.append('price',this.state.productprice);
       formData.append('description',this.state.productName);
       formData.append('category', "test");
       formData.append('product',this.state.file);
       this.props.addProductAction(formData, this.props.history);
  }
handleChange(e) {
    let target = e.target;
   if(target.name === 'productimagefield'){
       let fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
       console.log(target.files[0]);  
        console.log(fileTypes.indexOf(target.files[0].type));                      
        if(fileTypes.indexOf(target.files[0].type) < 0)  {
            this.setState({
                productfileerror: "Please select .jpg or .png or .jpeg file",
                isError: false
            });             
        } else if(target.files[0]){
            this.setState({
                productfileerror: "",
                productimagename:target.files[0].name,
                productName: target.files[0].name,
                file: target.files[0],
                isError: false
            }); 
        } 
        
    }

    if(target.name === 'productnamefield'){
        console.log("productnamefield", target.value.length);
        if(target.value === '' || target.value === null ){
            console.log("e.target", target.name);
            this.setState({
                productnamefielderror:true,
                productnamefieldmsg:"Please enter product name",
                isError: true
            });         
        }else if(target.value.length < 6 ){ 
             this.setState({
                productnamefielderror:true,
                productnamefieldmsg:"Please enter product name greater than six character",
                isError: true
            });
        } else if(target.value != '' || target.value != null ){
            this.setState({
                productnamefieldmsg:'',
                productName: target.value,
            });        
        }      
    }

    if(target.name === 'producttextfield'){
            
        if(target.value === '' || target.value === null ){
            console.log("e.targetproducttextfield", target.name);
            this.setState({
                producttextfielderror:true,
                producttextfieldmsg:"Please enter product description",
                isError: true
            });         
        }else if(target.value.length < 60 ){ 
             this.setState({
                producttextfielderror:true,
                producttextfieldmsg:"Please enter product description greater than sixty character",
                isError: true
            });
        } else {
            this.setState({
                producttextfieldmsg:'',
                productdescription: target.value,
            });             
        }      
    }
    // console.log(target.name);
    if(target.name === 'productpricefield'){
        if(target.value === '' || target.value === null ){
            this.setState({
                productprice: 0,
            });  
        }  else if(target.value != '' || target.value != null ){
            this.setState({
                productprice: target.value,
            });              
        } 
    
    }
}

errorMessage() {
    console.log(this.props.errorMessage);
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    return (
        <Fragment>
        <div className="pagetitle">
          <div className="titleicon">
            <Icon.Box size={30} color="white"/>
          </div>
          <div className="titletext">
            Add Your Product 
          </div>
        </div>
         <div className="clearboth"></div>

          <div className="bulkuploadform">
        
        <div className="bulkuploadtitle">
          Let's begin with you first product
        </div>
      
        <form onSubmit={this.onFormSubmit}>
        <div className="bulkinput">

      
         <div className="bulkuploadfield">
         <p>Add Image</p>        
         <div class="choose_file">
           <span><Icon.Upload  color="blue" size={100} /></span>
           
          </div>   
          <input type="file" name="productimagefield" onChange={(e)=>{this.handleChange(e)}} />
          <p className="uploadFilename">{this.state.productimagename ? this.state.productimagename : ''}</p> 
          </div>

          <div className="productformctrl">

          <div className="addproductfieldinfo">
                <div className="productnamegroup inputgroup">
                    <input type="text" name="productnamefield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="productnamefield producttxtfield" placeholder="Product Name" />
                    <div className="errmsg">{this.state.productnamefielderror ? <span style={{color: "red"}}>{this.state.productnamefieldmsg}</span> : ''}</div> 
                </div>
                <div className="producttextgroup inputgroup">
                    {/* <input type="text" name="producttextfield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" /> */}
                    <textarea name="producttextfield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product"></textarea>
                    <div className="errmsg">{this.state.producttextfielderror ? <span style={{color: "red"}}>{this.state.producttextfieldmsg}</span> : ''}</div> 
                </div>
                <div className="productpricegroup inputgroup">
                    <input type="number" name="productpricefield" pattern="(\d{3})([\.])(\d{2})"  onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}}  className="productpricefield producttxtfield" placeholder="Price (optional)" />
                    <div className="errmsg"></div> 
                </div>                                        

                <div className="submitField">
                    <button type="submit" className="productsubmit"  disabled = {!this.state.productprice || !this.state.productName || !this.state.productdescription || !this.state.file  ? 'disabled' : ''} >Add</button>
                    <div className="addproducterr errmsg">
                    {this.errorMessage()}
                    {this.state.productfileerror ? <span style={{color: "red"}}>{this.state.productfileerror}</span> : ''}   
                    
                    </div> 
                </div>
          </div>
          
          </div>

       
       

        </div>
      </form>
    </div>

       </Fragment> 
    );
  }
}

function mapStateToProps(state) {
    return { errorMessage: state.products.addError };
  }

export default connect(mapStateToProps, { addProductAction })(AddProduct);

