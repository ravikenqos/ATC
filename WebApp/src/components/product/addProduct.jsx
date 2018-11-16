import React, { Component } from 'react';
import { connect } from 'react-redux';



import './product.css';
import * as Icon from 'react-feather';



class AddProduct extends Component {

  constructor(props) {
    super(props);
    this.state ={
    
    }
    // this.onFormSubmit = this.onFormSubmit.bind(this)
    // this.onChange = this.onChange.bind(this)
  }
//   onFormSubmit(e){
//     e.preventDefault() // Stop form submit
//     if(!this.state.file){
//       this.props.productBulkUploadAction(null, this.props.history);
//     } else if(this.state.file.type !== 'text/csv')  {
//       this.props.productBulkUploadAction(null, this.props.history);
//     } else {
//       const formData = new FormData();
//       formData.append('csvfile',this.state.file);
//       formData.append('store_id', 210);
//       this.props.productBulkUploadAction(formData, this.props.history);
//     }  
//   }
//   onChange(e) {
//     this.setState({file:e.target.files[0]});
//   //  if(e.target.files[0]){
//       this.filename(e.target.files[0].name)
//    // }
//   }
//   filename(name){
//     document.getElementsByClassName('uploadFilename').innerhtml = "name";
//   }

//   errorMessage() {
//     console.log(this.props.errorMessage);
//     if (this.props.errorMessage) {
//       return (
//         <div className="info-red">
//           {this.props.errorMessage}
//         </div>
//       );
//     }
//   }

handleChange(e) {
    const target = e.target;
    console.log("e.target", target.name);
    if(target.name === 'productimagefield'){
        if(target.files[0]){
            this.setState({
                productimagename: target.files[0].name,
                isError: false
            });                      
        }        
    }    
    if(target.name === 'productnamefield'){
            
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
        } else {
             this.setState({
                productnamefielderror:false,     
                isError: false
            })            
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
                producttextfielderror:false,
                isError: false     
            })            
        }      
    }    
}


  render() {
    return (
      <div>
        <div className="pagetitle">
          <div className="titleicon">
            <Icon.Box size={45} color="white"/>
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
                        <input type="text" name="producttextfield" onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" />
                        <div className="errmsg">{this.state.producttextfielderror ? <span style={{color: "red"}}>{this.state.producttextfieldmsg}</span> : ''}</div> 
                    </div>
                    <div className="productpricegroup inputgroup">
                        <input type="text" name="productpricefield" className="productpricefield producttxtfield" placeholder="Price (optional)" />
                        <div className="errmsg"></div> 
                    </div>                                        

                    <div className="submitField">
                        <button type="submit" className="productsubmit" >Add</button>
                        <div className="addproducterr errmsg"></div> 
                    </div>

              </div>
 
              
              </div>

           
           

            </div>
          </form>
        </div>

     </div> 
   )
  }
}



export default AddProduct;