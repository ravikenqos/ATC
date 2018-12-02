import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr'
import axios, { post } from 'axios';

import { productBulkUploadAction  }  from './../../actions/bulkUpload'

import './product.css';
import './productbulkupload.css';
import * as Icon from 'react-feather';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';


class ProductBulkUpload extends Component {

  constructor(props) {
    super(props);
    this.state ={
      productimagename: null,
      file:null,
      uploaderror:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    let filetypes = ["text/csv", "application/vnd.ms-excel"];
    if(!this.state.file){
      console.log("is");
      this.setState({uploaderror: 'Error: Please select csv file!..'})
    } else if(filetypes.indexOf(this.state.file.type) < 0 )  {
      console.log("file extension", this.state.file.type);
      this.setState({uploaderror: 'Error: Please select csv file!..'})
    } else {
      this.setState({uploaderror: null})
      const formData = new FormData();
      formData.append('csvfile',this.state.file);
      formData.append('store_id', 210);
      this.props.productBulkUploadAction(formData, this.props.history);
    }  
  }
  onChange(e) {
    // toastr.success('The title', 'The message')
    if(e){
      this.setState({file: e.target.files[0]});
      console.log("file details", e.target.files[0]);
      if(e.target.files[0]){
        console.log("file details", e.target.files[0]);
        this.filename(e.target.files[0].name)
      }
    }
  }
  filename(name){
    this.setState({
        productimagename: name,
    });                      
  }

  downloadCsv(e){
    if(e){
      console.log("URL", URL)
      let url = 'http://34.209.125.112/samplefiles/products-upload-sample.csv';
      axios({
        url: url, //your url
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products-upload-sample.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    }
  }

  showSuccess(){
    const toastrOptions = {
      timeOut: 2000,
      onHideComplete: () => {
          
      },
    } 
    if(this.props.bulkupload){
      this.props.getProducts();
      toastr.success('Bulk Upload', 'File_Uploaded', toastrOptions);
    }    
  }
  errorMessage() {
    if (this.props.errorMessage) {
      toastr.error('Error: Upload Failed!..');
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    this.showSuccess(); 
    return (
      <div>
        <div className="pagetitle">
          <div className="titleicon">
            <Icon.Box size={25} color="white"/>
          </div>
          <div className="titletext">
            Add Your Products
          </div>
        </div>
         <div className="clearboth"></div>

          <div className="bulkuploadform">
        
            <div className="bulkuploadtitle">
              Choose Your CSV file to import: <span>import data only from csv.</span>
            </div>
          
            <form onSubmit={this.onFormSubmit}>
            <div className="bulkinput">

          
             <div className="bulkuploadfield">
             <p>Add Document</p>        
             <div class="choose_file">
               <span><Icon.Upload  color="blue" size={100} /></span>
               
              </div>   
              <input type="file" onChange={this.onChange} />
              <p className="uploadFilename">{this.state.productimagename ? this.state.productimagename : ''}</p>  
              </div>

              <div className="bulkformctrl">

              <div className="bulkuploadfieldinfo">
                <p>Need help importing your CSV file?</p>
                <p><a onClick={this.downloadCsv}>Download our pre formatted and follow the formatting for best results</a></p>
                <p className="bulkuploaderr err-info">
                {this.state.uploaderror ? <span style={{color: "red"}}>{this.state.uploaderror}</span> : ''} 
                {this.errorMessage()}
                </p>
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
  return { 
    errorMessage: state.bulkUpload.error,
    bulkupload: state.bulkUpload.upload,
   };
}

export default connect(mapStateToProps, { productBulkUploadAction })(ProductBulkUpload);