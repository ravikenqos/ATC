import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr'
import axios, { post } from 'axios';

import { productBulkUploadAction, changeBulkuploadStatus }  from './../../actions/bulkUpload'
import { addyourproducts }from '../addyourproducts/addyourproducts.jsx';
import './product.css';
import './productbulkupload.css';
import * as Icon from 'react-feather';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';


class ProductBulkUpload extends Component {

  componentWillMount(){
    let loggedUser = JSON.parse(localStorage.getItem('acc'));
    if(loggedUser){
        this.setState({storeid:loggedUser.storeid});
    }
}

  constructor(props) {
    super(props);
    this.state ={
      productimagename: null,
      file:null,
      uploaderror:null,
      process:false,
      storeid:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    let filetypes = ["text/csv", "application/vnd.ms-excel"];
    if(!this.state.file){
      this.setState({uploaderror: 'Error: Please select csv file!..'})
    } else if(filetypes.indexOf(this.state.file.type) < 0 )  {
      this.setState({uploaderror: 'Error: Please select csv file!..'})
    } else {
      this.setState({
        process: true,
        uploaderror: null
      });  

      const formData = new FormData();
      formData.append('csvfile',this.state.file);
      let loggedUser = JSON.parse(localStorage.getItem('acc'));
      formData.append('store_id',loggedUser.storeid);
      this.props.productBulkUploadAction(formData, this.props.history);
    }  
  }
  onChange(e) {
    if(e){
      this.setState({file: e.target.files[0]});
      if(e.target.files[0]){
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
      //let url = 'http://34.209.125.112/samplefiles/products-upload-sample.csv';
      let url = 'https://app.aroundthecorner.store/samplefiles/products-upload-sample.csv';
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

  showSuccess = () =>{
    const toastrOptions = {
      timeOut: 2000,
      onHideComplete: () => {
          this.props.history.push('/addyourproducts');
      },
  }  
    if(this.props.bulkupload){
      this.props.changeBulkuploadStatus("bulkupload");
      toastr.success('Bulk Upload', 'File_Uploaded', toastrOptions)
      this.setState({
        productimagename: null,
        file:null,
        uploaderror:null,
        process:false
      });
    }    
  }

  componentWillReceiveProps = (reduxprops) => {
    if(reduxprops.bulkupload) {
      this.setState({
        process:false
      });       
    }
    if(reduxprops.errorMessage) {
      this.setState({
        process:false
      });       
    }    
  }

  errorMessage = () => {
    if (this.props.errorMessage) {
      this.props.changeBulkuploadStatus("bulkuploadError");
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
            {!this.state.storeid ? 
              <div className="alert warning">
                  <strong>Warning!</strong> Please enter your store details and do bulk upload
              </div>
          : '' }          
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
              <p className="uploadFilename bulkfilename">{this.state.productimagename ? this.state.productimagename : ''}</p>  
              </div>

              <div className="bulkformctrl">

              <div className="bulkuploadfieldinfo">
                <p>Need help importing your CSV file?</p>
                <p><a onClick={this.downloadCsv}>Download our pre formatted and follow the formatting for best results</a></p>
                <p className="bulkuploaderr err-info">
                {this.state.uploaderror ? <span style={{color: "red"}}>{this.state.uploaderror}</span> : ''} 
                {this.errorMessage()}
                </p>
                {this.state.storeid ? 
                <div className="submitField">
                  <button type="submit" className="bulkuploadsubmit" >Upload</button>
                  <div className="processmsg">{this.state.process ? 'Processing...' : ''}</div>
                </div>
                : '' }   
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

export default connect(mapStateToProps, { productBulkUploadAction, changeBulkuploadStatus })(ProductBulkUpload);