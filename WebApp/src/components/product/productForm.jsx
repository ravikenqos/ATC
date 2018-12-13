import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addProductAction, updateProductAction, getProducts, changeProductStaus }  from './../../actions/product_action'
import * as Icon from 'react-feather';
import {toastr} from 'react-redux-toastr';

import MultipleSelect from './multiselect';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import Select from './select';



class ProductForm extends Component {
  constructor(props){
    super(props);
     console.log('rowdata', this.props);
     console.log('rowdatacategories', this.props.categories);
     
    this.state ={
      file: null,
      productName: this.props.rowData[0],
      productdescription: this.props.rowData[3],
      productprice: this.props.rowData[5],
      image: this.props.rowData[4],
      category:this.props.rowData[1],
      category_id:this.props.rowData[2],
      categories:this.props.categories,
      isError: false,
      product_id:this.props.rowData[6],
      formTitle:this.props.modaltile,
      formAction:this.props.modalbutton,
      isMouseInside: false,
      uploadImage: false,
      uploadStatus: false,
      processing:false,
      productfileerr:false,
      productnamefielderror:false,
      producttextfielderror:false 
      
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
//    console.log("formavalues", this.state);
      const formData = new FormData();
      this.setState = ({"processing" : true});
      let loggedUser = JSON.parse(localStorage.getItem('acc'));
      formData.append('store_id',loggedUser.storeid);
      formData.append('product_id',this.state.product_id);
      formData.append('title',this.state.productName);
      formData.append('price',this.state.productprice);
      formData.append('description',this.state.productdescription);
      formData.append('category', this.state.category_id);      
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
        if(fileTypes.indexOf(target.files[0].type) < 0)  {
            this.setState({
                productfileerr: true,
                productfilemsg: "Please select .jpg or .png or .jpeg file",
                isError: false
            });             
        } else if(target.files[0]){
            this.setState({
                productfileerr: false,
                productfilemsg: "",
                productimagename:target.files[0].name,
                productName: target.files[0].name,
                image:null,
                file: target.files[0],
                isError: false
            }); 
        } 
        
    }

    if(target.name === 'productnamefield'){
        if(target.value === '' || target.value === null ){
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
                    productnamefielderror:false,
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
                    producttextfielderror:false,
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
  listCategories(){
     return (  
        // <MultipleSelect categories={this.props.categories} category={this.state.category} getSelectValue={this.getSelectValue}/>
        <Select categories={this.props.categories} category_id={this.state.category_id} category={this.state.category} getSelectValue={this.getSelectValue}/>
    );
   
  }
    getSelectValue = (value) =>{
        this.setState({
            category_id : value
        });
    }


  showSuccess(){
    const toastrOptions = {
        timeOut: 2000,
        onHideComplete: () => {
          
        },
    } 

     if(this.props.productUpdate){
        this.props.changeProductStaus("productUpdate"); 
        let loggedUser = JSON.parse(localStorage.getItem('acc'));
        this.props.getProducts(loggedUser.storeid);
        toastr.success('Update product', 'Success');
        this.props.handleClose();
        this.setState = ({"processing" : false});
      }

  }

    showFailure(){
        if(this.props.productUpdateError){
            this.props.changeProductStaus("productUpdateError");
            this.props.handleClose();
            this.setState = ({"processing" : false});            
            toastr.error('Update product', this.props.productUpdateError);
        }   
    }  

    render(){
        console.log(this.state);
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
          </div>
          </div>
          <div className="clearboth"></div>
          <div className="bottominputs">
                <div className="categorygroup inputgroup">
                    { this.listCategories()}
                    <div className="errmsg"></div>
                </div> 
                <div className="productsubmitField">
                    <button type="submit" className="productsubmit" disabled = {this.state.productfileerr || this.state.productnamefielderror || this.state.producttextfielderror || (!this.state.image && !this.state.file)? 'disabled' : ''}>{this.state.formAction}</button>
                    <div className="processing" style={{ display: this.state.processing ? 'block' : 'none'}}>
                    <i class="fa fa-circle-notch fa-spin fa-1x fa-fw"></i>processing...</div>
                    <div className="addproducterr errmsg">
                    {/* {this.errorMessage()}  */}
                    {this.state.productfileerr || this.state.productnamefielderror || this.state.producttextfielderror || (!this.state.image && !this.state.file)? 'disabled' : ''}
                    {this.state.productfilemsg ? <span style={{color: "red"}}>{this.state.productfilemsg}</span> : ''} 
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
    return { 
        productUpdate: state.products.update,
        productUpdateError: state.products.updateError
     };
}

export default connect(mapStateToProps, { getProducts, addProductAction, updateProductAction, changeProductStaus })(ProductForm);