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
     let value = Number(this.props.rowData[5]);
      value = value.toFixed(2);
    this.state ={
      file: null,
      productimagename: null,
      productName: this.props.rowData[0],
      productdescription: this.props.rowData[3],
      productprice: value,
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



    if(!this.state.file){
        this.setState({
            productfileerror: "Please add an image",
            isError: true
        });     
    }else {
        this.setState({
            productfileerror: null,
            isError: false
        }); 
    }     

    if(!this.state.productName){
        this.setState({
            productnamefielderror:true,
            productnamefieldmsg:"Please enter product name",
            isError: true
        });     
    }else {
        if(this.state.productName.length < 6 ){
            this.setState({
                productnamefielderror:true,
                productnamefieldmsg:"Please enter product name greater than six character",
                isError: true
            });        
        } else {
            this.setState({
                productnamefieldmsg:'',
                isError: false
            });
        }       
    }

    if(!this.state.productdescription){
        this.setState({
            producttextfielderror:true,
            producttextfieldmsg:"Please enter product description",
            isError: true
        });         
    } else {
        if(this.state.productdescription.length < 30 ){ 
            this.setState({
               producttextfielderror:true,
               producttextfieldmsg:"Please enter product description greater than thirty character",
               isError: true
           });
       } else {
        this.setState({
            producttextfieldmsg:'',
            isError: false
        }); 
       }
    }
    if(!this.state.productprice){
            this.setState({
                productprice: 0,
            });  
    }  else {
            this.setState({
                isError: false,
            });              
    }           
    if(!this.state.category){
        this.setState({
            productcategoryfielderror:true,
            productcategoryfieldmsg:"Please select any category",
            isError: true
        });         
    } else {
        this.setState({
            productcategoryfieldmsg:'',
            isError: false
        }); 
       
    }    
    // if(this.state.category && this.state.productName && this.state.productdescription && this.state.file){

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
    //    }


       
 }
  handleChange(e) {
    let target = e.target;
   if(target.name === 'productimagefield'){
       let fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if(fileTypes.indexOf(target.files[0].type) < 0)  {
            this.setState({
                productfileerr: true,
                productfilemsg: "Please add an image",
                productimagename:target.files[0].name,
                isError: false
            });             
        } else if(target.files[0]){
            let reader = new FileReader();
            reader.onload = (e) => {
                document.querySelector('.storeImgSrc').src = e.target.result;
            }
            reader.readAsDataURL(target.files[0]);
            document.querySelector('.addlogotxt').style.opacity = 0;
            document.querySelector('.choose_file').style.opacity = 0;            
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
            if(target.value.length < 30 ){ 
                this.setState({
                    producttextfielderror:true,
                    producttextfieldmsg:"Please enter product description greater than thirty character",
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
                productprice: '',
            });  
        }  else if(target.value != '' || target.value != null ){
            let value = Number(target.value)
            let price = value.toFixed(2);
            this.setState({
                productprice: price,
            });     
        } 
    }
  }

  setValue = (e) => {
    let target = e.target;
    if(target.name === 'productnamefield'){ 
        this.setState({
            productName: target.value,
        }); 
    }    
    if(target.name === 'producttextfield'){ 
        this.setState({
            productdescription: target.value,
        }); 
    }    

    if(target.name === 'productpricefield'){
            let value = target.value
            this.setState({
                productprice: value,
            });              
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
        toastr.success('Successfully updated', 'Success');
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
                       <Fragment>
                        <div className="uploadimage">
                                   
                            <div class="choose_file">
                               <p className="addlogotxt">Add Image</p> 
                                <span><Icon.Upload  color="blue" size={100} /></span>
                            </div>   
                            <input type="file" name="productimagefield"  onChange={(e)=>{this.handleChange(e)}}/>
                            <div className="previewThumbnail" style={{position: "absolute"}}>
                                <img src="" className="storeImgSrc" style={{maxWidth: "100%", height: "auto"}} /> 
                            </div> 

                        </div>
                       
                            <p className="uploadFilename">{this.state.productimagename ? this.state.productimagename : ''}</p>
                            <div  className="errmsg">{this.state.productfileerror ? <span style={{color: "red"}}>{this.state.productfileerror}</span> : ''} </div> 
                            </Fragment>
                        : '' }
                        <div className="imageThumbnail" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ display: this.state.image ? '' : 'none'}}>
                            {this.state.isMouseInside ? <p className="closeImage"  onClick={this.deleteImage}><i class="fa fa-times fa-2x" style={{color:"black"}}aria-hidden="true"></i></p> : '' }
                            <img src={this.state.image} className="storeImgSrc" style={{maxWidth: "100%", height: "auto"}}/> 
                        </div>                         
                    </div>

          <div className="productformctrl">

          <div className="addproductfieldinfo">
                <div className="productnamegroup inputgroup">
                    <input type="text" name="productnamefield" value={this.state.productName ? this.state.productName : ''} onChange={(e)=>{this.setValue(e)}}  onBlur={(e)=>{this.handleChange(e)}}   className="productnamefield producttxtfield" placeholder="Product Name" />
                    <div className="errmsg">{this.state.productnamefielderror ? <span style={{color: "red"}}>{this.state.productnamefieldmsg}</span> : ''}</div> 
                </div>
                <div className="producttextgroup inputgroup">
                    {/* <input type="text" name="producttextfield" value={this.state.productdescription} onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" /> */}
                    <textarea name="producttextfield" value={this.state.productdescription} onChange={(e)=>{this.setValue(e)}}  onBlur={(e)=>{this.handleChange(e)}}    onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product"></textarea>
                    <div className="errmsg">{this.state.producttextfielderror ? <span style={{color: "red"}}>{this.state.producttextfieldmsg}</span> : ''}</div> 
                </div>
                <div className="productpricegroup inputgroup">
                    <input type="number" name="productpricefield" step="any"  value={this.state.productprice} onChange={(e)=>{this.setValue(e)}}  onBlur={(e)=>{this.handleChange(e)}}   className="productpricefield producttxtfield" placeholder="Price (optional)" />
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