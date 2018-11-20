import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { addProductAction, updateProductAction, getProducts, changeProductUpdateStatus }  from './../../actions/product_action'

import * as Icon from 'react-feather';

import {toastr} from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
class ProductForm extends Component {
  constructor(props){
    super(props);
    this.state ={
      file: null,
      productName: this.props.rowData.title,
      productdescription: this.props.rowData.description,
      productprice: this.props.rowData.price,
      image: this.props.rowData.image,
      category:null,
      isError: false,
      product_id:this.props.rowData.id,
      formTitle:this.props.rowData.formTitle,
      formAction:this.props.rowData.formAction,
      isMouseInside: false,
      uploadImage: false,
      uploadStatus: false,
      processing:false 
      
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
      const formData = new FormData();
      this.setState = ({"processing" : true});
      formData.append('store_id',210);
      formData.append('product_id',this.state.product_id);
      formData.append('title',this.state.productName);
      formData.append('price',this.state.productprice);
      formData.append('description',this.state.productdescription);
      formData.append('category', "test");      
      if(this.state.image){
        formData.append('image', this.state.image);
        formData.append('product',this.state.file);
        
      } else if(this.state.file){
        formData.append('image', this.state.image);
        formData.append('product',this.state.file); 
      }
//      if(this.props.rowData.formAction === 'edit'){
        this.props.updateProductAction(formData, this.props.history);
    //   } else if(this.props.rowData.formAction === 'add'){
    //     this.props.addProductAction(formData, this.props.history);
    //   }

       
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
        console.log("productnamevalue", e.target.value);
        if(target.value === '' || target.value === null ){
            console.log("e.target", target.name);
            this.setState({
                productnamefielderror:true,
                productnamefieldmsg:"Please enter product name",
                isError: true
            });         
        }else { 
            if(target.value.length < 6 ){ 
                this.setState({
                    productnamefielderror:true,
                    productnamefieldmsg:"Please enter product name greater than six character",
                    productName: target.value,
                    isError: true
                });
            } else if(target.value != '' || target.value != null ){
                this.setState({
                    productnamefieldmsg:'',
                    productName: target.value,
                });        
            }
        }      
    }
    if(target.name === 'producttextfield'){
        if(target.value === '' || target.value === null ){
            this.setState({
                producttextfielderror:true,
                producttextfieldmsg:"Please enter product description",
                isError: true
            });         
        } else { 
            if(target.value.length < 60 ){ 
                this.setState({
                    producttextfielderror:true,
                    producttextfieldmsg:"Please enter product description greater than sixty character",
                    isError: true,
                    productdescription: target.value,
                });
            } else {
                this.setState({
                    producttextfieldmsg:'',
                    productdescription: target.value,
                });             
            }
        }      
    }
  
    if(target.name === 'productpricefield'){
        if(target.value === '' || target.value === null ){
            this.setState({
                productprice: 0,
            });  
        }  else if(target.value != '' || target.value != null ){
          
            
                this.setState({
                    productprice: target.value,
                });   
           

            console.log(target.value);
           
        } 
    
    }
  }

  
  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  }
  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  }

  deleteImage = (e) => {
    if(e)
      this.setState({ image: null, isMouseInside: false, uploadImage: true });
  }

  showSuccess(){
     if(this.props.productUpdate){
         
        this.props.getProducts();
        toastr.success('Update product', 'Success');
        this.props.handleClose();
        this.setState = ({"processing" : false});
        this.props.changeProductUpdateStatus();
      }

  }

    showFailure(){
        if(this.props.productUpdateError){
        toastr.error('Update product', this.props.productUpdateError);
        this.props.handleClose();
        this.setState = ({"processing" : false});
        }
    }  

    render(){
        
        return (
         <Fragment>
             { this.showSuccess() }
             { this.showFailure() }
         <div className="bulkuploadform">
        
        <div className="bulkuploadtitle">
         {this.state.formTitle}
        </div>
      
        <form onSubmit={this.onFormSubmit}>
        <div className="bulkinput">

      
         <div className="bulkuploadfield">
         {this.state.uploadImage ?
            <div className="uploadimage">
                <p>Add Image</p>        
                <div class="choose_file">
                <span><Icon.Upload  color="blue" size={100} /></span>
                </div>   
                <input type="file" name="productimagefield" onChange={(e)=>{this.handleChange(e)}} />
                <p className="uploadFilename">{this.state.productimagename ? this.state.productimagename : ''}</p>           
              </div> 
            : '' }             
              <div className="imageThumbnail" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ display: this.state.image ? '' : 'none'}}>
                {this.state.isMouseInside ? <p className="closeImage"  onClick={this.deleteImage}><i class="fa fa-times" aria-hidden="true"></i></p> : '' }
                <img src={this.state.image}/> 
              </div>              
          </div>

          <div className="productformctrl">

          <div className="addproductfieldinfo">
                <div className="productnamegroup inputgroup">
                    <input type="text" name="productnamefield" value={this.state.productName} onChange={(e)=>{this.handleChange(e)}}   className="productnamefield producttxtfield" placeholder="Product Name" />
                    <div className="errmsg">{this.state.productnamefielderror ? <span style={{color: "red"}}>{this.state.productnamefieldmsg}</span> : ''}</div> 
                </div>
                <div className="producttextgroup inputgroup">
                    {/* <input type="text" name="producttextfield" value={this.state.productdescription} onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" /> */}
                    <textarea name="producttextfield" value={this.state.productdescription} onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product"></textarea>
                    <div className="errmsg">{this.state.producttextfielderror ? <span style={{color: "red"}}>{this.state.producttextfieldmsg}</span> : ''}</div> 
                </div>
                <div className="productpricegroup inputgroup">
                    <input type="number" name="productpricefield" value={this.state.productprice} onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} pattern="(\d{3})([\.])(\d{2})" className="productpricefield producttxtfield" placeholder="Price (optional)" />
                    <div className="errmsg"></div> 
                </div>                                        

                <div className="submitField">
                    <button type="submit" className="productsubmit" disabled = {!this.state.productprice || !this.state.productName || !this.state.productdescription || (!this.state.image && !this.state.file)? 'disabled' : ''} >{this.state.formAction}</button>
                    <div className="processing" style={{ display: this.state.processing ? '' : 'none'}}>
                    <i class="fa fa-circle-notch fa-spin fa-1x fa-fw"></i>processing...</div>
                    <div className="addproducterr errmsg">
                    
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
    return { productUpdate: state.products.update, productUpdateError: state.products.updateError };
}

export default connect(mapStateToProps, { getProducts, addProductAction, updateProductAction, changeProductUpdateStatus })(ProductForm);