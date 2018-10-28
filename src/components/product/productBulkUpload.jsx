import React, { Component } from 'react';
import axios, { post } from 'axios';

class ProductBulkUpload extends Component {
    render(){
        this.state ={
            csvfile: '',

          }
           this.onFormSubmit = this.onFormSubmit.bind(this);
           this.onChange = this.onChange.bind(this);
        //    this.createImage = this.createImage.bind(this);
        //   this.fileUpload = this.fileUpload.bind(this);
        }
        onFormSubmit(e){
          e.preventDefault() 
          console.log(e.target.files);
          const url = 'http://localhost:3000/api/ProductbulkUploads/uploads';
          const formData = new FormData();
          formData.append('csvfile', this.state.csvfile);
          formData.append('store_id', 210);  
          
          return  post(url, formData)
                  .then(response => console.log(response))         
        }
         onChange(e) {
             console.log(e.target.files);
           let files = e.target.files || e.dataTransfer.files;
            this.state.csvfile = files
        }
        // createImage(file) {
        //   let reader = new FileReader();
        //   reader.onload = (e) => {
        //     this.setState({
        //       image: e.target.result
        //     })
        //   };
        //   reader.readAsDataURL(file);
        // }
        fileUpload(csvfile){
           const url = 'http://localhost:3000/api/ProductbulkUploads/uploads';
           const formData = {csvfile: csvfile, store_id: 210}
           return  post(url, formData)
                   .then(response => console.log(response))
        }
      
       render()
       {
          return(
            <form onSubmit={this.onFormSubmit}>
            <h1>React js Laravel File Upload Tutorial</h1>
            <input type="file"  onChange={this.onFormSubmit} />
            
            <button type="submit">Upload</button>
          </form>
          )
       }
  
  
}

export default ProductBulkUpload