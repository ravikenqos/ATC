import React, { Component } from 'react';
import { connect } from 'react-redux';

import { productBulkUploadAction  }  from './../../actions/bulkUpload'

import './product.css';
import * as Icon from 'react-feather';



class ProductBulkUpload extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    console.log(this.state);
    const formData = new FormData();
    formData.append('csvfile',this.state.file);
    formData.append('store_id', 210);
    this.props.productBulkUploadAction(formData, this.props.history);

  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }


  errorMessage() {
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
      <div>
        <div className="pagetitle">
          <div className="titleicon">
            <Icon.Box size={30}/>
          </div>
          <div className="titletext">
            Add Your Products
          </div>
        </div>
         <div className="clearboth"></div>

          <div className="bulkuploadform">
        
            <div className="bulkuploadtitle">
              Choose Your CCV file to import: <span>import data only from csv.</span>
            </div>
          

            <div className="bulkinput">

          
             <div className="bulkuploadfield">
             <p>Add Document</p>        
             <div class="choose_file">
                <span><img src="http://localhost:3000/assets/uploadimg.png"/></span>
                <input type="file" onChange={this.onChange} />
              </div>   
               
                {this.errorMessage()}

              </div>

              <div className="bulkformctrl">

              <div className="bulkuploadfieldinfo">
                <p>Need help importing your CSV file?</p>
                <p><a>Download our pre formatted and follow the formatting for best results</a></p>
                <div className="submitField">
                <button type="submit" className="bulkuploadsubmit" >Upload</button>
              </div>

              </div>
 
              
              </div>

           
           

            </div>
   
        </div>

     </div> 
   )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.bulkUpload.error };
}

export default connect(null, { productBulkUploadAction })(ProductBulkUpload);