import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { addProductAction, changeProductStaus }  from './../../actions/product_action';
import { getCategories  }  from './../../actions/category';
import { addyourproducts }from '../addyourproducts/addyourproducts.jsx';
import './product.css';
import * as Icon from 'react-feather';
import Select from './select';
import {toastr} from 'react-redux-toastr';

class AddProduct extends Component {
    componentWillMount(){
        this.props.getCategories();
        let loggedUser = JSON.parse(localStorage.getItem('acc'));
        if(loggedUser){
            this.setState({storeid:loggedUser.storeid});
        }
    }
  constructor(props) {
    super(props);
    this.state ={
        file: null,
        productName: null,
        productdescription: null,
        productprice: null,
        category:null,
        isError: false,
        formsubmit:true,
        process:false,
        storeid:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    // this.onChange = this.onChange.bind(this)
  }
 onFormSubmit(e){
     e.preventDefault() // Stop form submit
     if(!this.state.file){
        this.setState({
            productfileerror: "Please select .jpg or .png or .jpeg file",
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
        if(this.state.productdescription.length < 60 ){ 
            this.setState({
               producttextfielderror:true,
               producttextfieldmsg:"Please enter product description greater than sixty character",
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

    if(this.state.category && this.state.productName && this.state.productdescription && this.state.file){
        this.setState({formsubmit: false}); 
        this.setState({process: true});   
        const formData = new FormData();
        let loggedUser = JSON.parse(localStorage.getItem('acc'));
        formData.append('store_id',loggedUser.storeid);
        formData.append('title',this.state.productName);
        formData.append('price',this.state.productprice);
        formData.append('description',this.state.productdescription);
        formData.append('category', this.state.category);
        formData.append('product',this.state.file);
        this.props.addProductAction(formData, this.props.history);       
    }
  }
handleChange(e) {
    let target = e.target;
    if(target.name === 'productimagefield'){
        let fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        // console.log(target.files[0]);  
        // console.log(fileTypes.indexOf(target.files[0].type));                      
        if(fileTypes.indexOf(target.files[0].type) < 0)  {
            this.setState({
                productfileerror: "Please select .jpg or .png or .jpeg file",
                productimagename:target.files[0].name,
                isError: false
            });             
        } else if(target.files[0]){
            this.setState({
                productfileerror: "",
                productimagename:target.files[0].name,
                file: target.files[0],
            }); 
        }  
        
    } //End of file
    if(target.name === 'productnamefield'){
        //console.log("productnamefield", target.value.length);
        if(target.value != '' || target.value != null ){
            if(target.value.length < 6 ){
                this.setState({
                    productnamefielderror:true,
                    productnamefieldmsg:"Please enter product name greater than six character",
                    isError: true
                });        
            } else {
                this.setState({
                    productnamefieldmsg:'',
                    productName: target.value,
                    isError: false
                });
            }            
        }      
    }
    if(target.name === 'producttextfield'){
        //console.log("productnamefield", target.value.length);
        if(target.value != '' || target.value != null ){
            if(target.value.length < 60 ){ 
                this.setState({
                    producttextfielderror:true,
                    producttextfieldmsg:"Please enter product description greater than sixty character",
                    isError: true
                });
            } else {
                this.setState({
                    producttextfieldmsg:'',
                    productdescription: target.value,
                    isError: false
                }); 
            }
        }      
    }

    if(target.name === 'productpricefield'){
        if(target.value != '' || target.value != null ){
            this.setState({
                productprice: target.value,
            });              
        } 
    }    


}
// componentWillReceiveProps = (nxtprops) => {
//     let hours = [];
//     if(nxtprops.user) {
//       conso  
//       let user = nxtprops.user.data[0];
//       let data = user || null;
//       if(data){
//         this.setState({
//           businessname:data.username || null,
//           email:data.email || null,
//         });
//       }
//     }
// } 
errorMessage() {
    console.log(this.props.errorMessage);
    if (this.props.errorMessage) {
      this.props.changeProductStaus("addProductError");  
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  listCategories(){
    return (  
        // <MultipleSelect categories={this.props.categories} getSelectValue={this.getSelectValue}/>
        <Select categories={this.props.categories} getSelectValue={this.getSelectValue}/>
    );
   
  }
  getSelectValue = (category_id) =>{
    if(category_id){
        this.setState({
            category : category_id,
            productcategoryfieldmsg:'',
            isError: false            
        });
    }
 
  }
  handlePrice = (e) =>{
      let val = e.target.value;
      val = val.toFixed(2);
    this.setState({
        productprice : val
    });   
  }
  showSuccess = () => {
    const toastrOptions = {
        timeOut: 2000,
        onHideComplete: () => {
            this.props.history.push('/addyourproducts');
        },
    }       
    if(this.props.productadd){
        this.props.changeProductStaus("addProduct");
        toastr.success('Add Product', 'Success', toastrOptions);
        this.setState ={
            process:false,
        }
    }
  }


  render() {
    this.showSuccess();   
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
        {!this.state.storeid ? 
            <div className="alert warning">
                <strong>Warning!</strong> Please enter your store details and do add  product
            </div>
        : '' }    
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
                    <input type="text" name="productnamefield" onBlur={(e)=>{this.handleChange(e)}} className="productnamefield producttxtfield" placeholder="Product Name" />
                    <div className="errmsg">{this.state.productnamefielderror ? <span style={{color: "red"}}>{this.state.productnamefieldmsg}</span> : ''}</div> 
                </div>
                <div className="producttextgroup inputgroup">
                    {/* <input type="text" name="producttextfield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" /> */}
                    <textarea name="producttextfield" onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product"></textarea>
                    <div className="errmsg">{this.state.producttextfielderror ? <span style={{color: "red"}}>{this.state.producttextfieldmsg}</span> : ''}</div> 
                </div>
                 <div className="productpricegroup inputgroup">
                    <input type="number" name="productpricefield" step="any"  min="0.00" max="100000.00"  onBlur={(e)=>{this.handleChange(e)}}  className="productpricefield producttxtfield" placeholder="Price (optional)" />
                    <div className="errmsg"></div> 
                </div>                                        
   
          </div>
         
          </div>
          <div className="clearboth"></div>
          <div className="bottominputs">
                <div className="categorygroup inputgroup">
                    { this.listCategories()}
                    <div className="errmsg">{this.state.productcategoryfielderror ? <span style={{color: "red"}}>{this.state.productcategoryfieldmsg}</span> : ''}</div>
                </div> 
                {this.state.storeid ? 
                    <div className="productsubmitField">
                        <button type="submit" className="productsubmit" disabled = {!this.state.formsubmit  ? 'disabled' : ''}>Add</button>
                        <div className="processmsg">{this.state.process ? 'Processing...' : ''}</div>
                        <div className="addproducterr errmsg">
                        {this.errorMessage()}
                        {this.state.productfileerror ? <span style={{color: "red"}}>{this.state.productfileerror}</span> : ''}   
                        </div> 
                    </div>
                : '' }   
       
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
        productadd: state.products.add,
        errorMessage: state.products.addError,
        categories: state.categories.data
        };
}

export default connect(mapStateToProps, { addProductAction, getCategories, changeProductStaus })(AddProduct);

