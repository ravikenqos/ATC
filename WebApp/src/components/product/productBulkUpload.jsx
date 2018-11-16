import React, { Component } from 'react';
import { connect } from 'react-redux';

import { productBulkUploadAction  }  from './../../actions/bulkUpload'

import './product.css';
import * as Icon from 'react-feather';



class ProductBulkUpload extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    if(!this.state.file){
      this.props.productBulkUploadAction(null, this.props.history);
    } else if(this.state.file.type !== 'text/csv')  {
      this.props.productBulkUploadAction(null, this.props.history);
    } else {
      const formData = new FormData();
      formData.append('csvfile',this.state.file);
      formData.append('store_id', 210);
      this.props.productBulkUploadAction(formData, this.props.history);
    }  
  }
  onChange(e) {
    this.setState({file:e.target.files[0]});
  //  if(e.target.files[0]){
      this.filename(e.target.files[0].name)
   // }
  }
  filename(name){
    document.getElementsByClassName('uploadFilename').innerhtml = "name";
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
      <div>
        <div className="pagetitle">
          <div className="titleicon">
            <Icon.Box size={45} color="white"/>
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
          
            <form onSubmit={this.onFormSubmit}>
            <div className="bulkinput">

          
             <div className="bulkuploadfield">
             <p>Add Document</p>        
             <div class="choose_file">
               <span><Icon.Upload  color="blue" size={100} /></span>
               
              </div>   
              <input type="file" onChange={this.onChange} />
              <p className="uploadFilename"></p> 
              </div>

              <div className="bulkformctrl">

              <div className="bulkuploadfieldinfo">
                <p>Need help importing your CSV file?</p>
                <p><a>Download our pre formatted and follow the formatting for best results</a></p>
                <p className="bulkuploaderr err-info">{this.errorMessage()}</p>
                <div className="submitField">
                <button type="submit" className="bulkuploadsubmit" >Upload</button>
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

function mapStateToProps(state) {
  return { errorMessage: state.bulkUpload.error };
}

export default connect(mapStateToProps, { productBulkUploadAction })(ProductBulkUpload);