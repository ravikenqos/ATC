import React, { Component, Fragment } from 'react';
import * as Icon from 'react-feather';
class ProductForm extends Component {
  constructor(props){
    super(props);
    this.state ={
      file: null,
      productName: this.props.rowData.title,
      productdescription: this.props.rowData.description,
      productprice: this.props.rowData.price,
      image: this.props.rowData.image,
      isError: false,
      product_id:this.props.rowData.id,
      formTitle:this.props.rowData.formTitle,
      formAction:this.props.rowData.formAction,
      isMouseInside: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
      console.log(this.state);
      // const formData = new FormData();
      // formData.append('store_id',210);
      // formData.append('title',this.state.productName);
      // formData.append('price',this.state.productprice);
      // formData.append('description',this.state.productName);
      // formData.append('category', "test");
      // formData.append('product',this.state.file);
      // this.props.addProductAction(formData, this.props.history);
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
  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  }
  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  }

  deleteImage = (e) => {
    if(e)
      this.setState({ image: null, isMouseInside: false });
  }

    render(){
      
        return (
          <Fragment>
         <div className="bulkuploadform">
        
        <div className="bulkuploadtitle">
         {this.state.formTitle}
        </div>
      
        <form onSubmit={this.onFormSubmit}>
        <div className="bulkinput">

      
         <div className="bulkuploadfield">
          

              <div className="imageThumbnail" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
              {this.state.isMouseInside ? <p className="closeImage"  onClick={this.deleteImage}><i class="fa fa-times" aria-hidden="true"></i></p> : '' }
              {this.state.image ? <img src={this.state.image}/> : '' }

              </div>              
          </div>

          <div className="productformctrl">

          <div className="addproductfieldinfo">
                <div className="productnamegroup inputgroup">
                    <input type="text" name="productnamefield" value={this.state.productName} onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="productnamefield producttxtfield" placeholder="Product Name" />
                    <div className="errmsg"></div> 
                </div>
                <div className="producttextgroup inputgroup">
                    <input type="text" name="producttextfield" value={this.state.productdescription} onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} className="producttextfield producttxtfield" placeholder="Describe your product" />
                    <div className="errmsg"></div> 
                </div>
                <div className="productpricegroup inputgroup">
                    <input type="number" name="productpricefield" value={this.state.productprice} onChange={(e)=>{this.handleChange(e)}}  onBlur={(e)=>{this.handleChange(e)}} pattern="(\d{3})([\.])(\d{2})" className="productpricefield producttxtfield" placeholder="Price (optional)" />
                    <div className="errmsg"></div> 
                </div>                                        

                <div className="submitField">
                    <button type="submit" className="productsubmit" >{this.state.formAction}</button>
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

export default ProductForm