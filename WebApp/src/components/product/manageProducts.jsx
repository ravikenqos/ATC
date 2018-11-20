import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import Modal from '@material-ui/core/Modal';
import { getProducts, deleteProductAction,  deleteSelectedProductAction, changeProductDeleteStatus }  from './../../actions/product_action';
import logoLight from '../../assets/atclightlogo.png';


import './product.css';
import './manageProduct.css';
import * as Icon from 'react-feather';
import SimpleModal from './SimpleModal.jsx';
import {toastr} from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';



class ImageFormater extends React.Component {
  render() {
    return (<div></div>);
  }
}

class MyFormatter extends React.Component {
  render(){
    console.log(this.props.rowData);
    return(
      <div>
        
        <span className="deleteproduct"><i class="fa fa-trash" aria-hidden="true"></i></span>
    </div>
    );
  }
};
class ManageProducts extends Component {
    componentWillMount(){
        this.props.getProducts();
        
    }

    constructor(props, context){
      super(props, context);
     
      this._columns = [
        
        { key: 'producname', name: 'Product Name', width: 185 },
        { key: 'description', name: 'Description', width: 185 },
        { key: 'image', name: 'Image', resizable: true, width: 185, formatter: (props)=>(this.renderImage(props.row.rowData))},
        { key: 'price', name: 'Price', width: 185 },
        { key: 'update', name: 'Update', width: 185,  formatter: (props)=>(this.updateActions(props.row.rowData))},
      ];

      this.state = { rows: null, selectedIndexes: [], rowData:null, deleteProducts:[]};
      this.onRowsSelected = this.onRowsSelected.bind(this);
      this.deleteSelectedProducts = this.deleteSelectedProducts.bind(this);
      this.openSimpleModal = this.openSimpleModal.bind(this);      
    }
    createRows = () => {
      let rows = [];
      let products = this.props.products;
      if(products){
        products.map((items) => {
          rows.push({
             id:items.id,
             producname: items.title,
             description: items.description,
             image: items.image,
             price: items.price,
             update: items.update,
             rowData:items
            });        
          });       
      
      }  
      this._rows = rows;
    };
    renderImage(item){
      return(
        <Fragment>
          <img className="rowProductImage" src={item.image} width="50" height="50"/>
        </Fragment>
      );
    }

    updateActions(items){
      items.formTitle = 'Edit Product';
      items.formAction = 'Edit';    
     return(
       <Fragment>
        <SimpleModal rowData={items}/>
        <span className="deleteproduct productaction" onClick={() => this.deleteProduct(items)}><i class="fa fa-trash" aria-hidden="true"></i></span>
      </Fragment>
     );
    }

    deleteProduct(items){
      this.props.deleteProductAction(items.id, this.props.history)
    }


    getCellActions(column, row) {
      // if (column.key === 'update') {
      //   return(<Icon.Box size={20} color="white"/>); 
      // }   
     console.log ("row", row) ;
    }  

    rowGetter = (i) => {
      return this._rows[i];
    };

    onRowsSelected = rows => {
      this.setState({
        selectedIndexes: this.state.selectedIndexes.concat(
          rows.map(r => r.rowIdx)
        )
      });
       console.log("rows", rows);
      let products = [];
      rows.forEach((item) => {
        products.push(
          item.row.id
        )

      })
      //console.log("products", products);
      this.setState({deleteProducts: this.state.deleteProducts.concat(products)});
    // console.log("deleteProducts", this.state.deleteProducts);
       
    //  this.setState({deleteProducts: [...this.state.deleteProducts, products]})
      //this.setState({deleteProducts: products})
    };
  
    onRowsDeselected = rows => {
      console.log("deselectedrows", rows);
      let rowIndexes = rows.map(r => r.rowIdx);
      this.setState({
        selectedIndexes: this.state.selectedIndexes.filter(
          i => rowIndexes.indexOf(i) === -1
        )
      });
      rows.forEach((item) => {
          let index = this.state.deleteProducts.indexOf(item.row.id)
          this.state.deleteProducts.splice(index, 1);
      })
      
      

    };
    
    deleteSelectedProducts(e){
      if(e){

        if(this.state.deleteProducts.length < 1){
          toastr.error('Nothing To Delete', 'Select Any Product!');
        } else {
          this.props.deleteSelectedProductAction(this.state.deleteProducts);
        }
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
      if(this.props.productDelete){
        this.props.getProducts();
        toastr.success('Delete Product', 'Success', toastrOptions);
        this.props.changeProductDeleteStatus();
      }
      if(this.props.deleteall){
        toastr.success('Delete Selected Product', 'Success', toastrOptions);
      }

    }
 
    showFailure(){
      if(this.props.deleteError){
        toastr.error('Error!');
      }
    } 

    openSimpleModal() {
      this.setState({simpleModalVisibility: true});
    }
    render() {
      this.createRows();
      this.showSuccess() 
      this.showFailure()       
      const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
      return  (
              <Fragment>
                <div className="pagetitle">
                  <div className="titleicon">
                    <Icon.Box size={20} color="white"/>
                  </div>
                  <div className="titletext">
                    Manage Products
                  </div>
                </div>
                <div className="clearboth"></div>
                <div className="deleteAction">
                  <button className="deleteButton" onClick={this.deleteSelectedProducts}>Delete Products</button>
                </div>  
                <div className="productDataGrid">
                  <ReactDataGrid
                    enableCellSelect={true}
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this._rows.length}
                    minHeight={500}
                    rowHeight={50}
                    minColumnWidth={200}
                    rowSelection={{
                      showCheckbox: true,
                       enableShiftSelect: true,
                      onRowsSelected: this.onRowsSelected,
                      onRowsDeselected: this.onRowsDeselected,
                      selectBy: {
                        indexes: this.state.selectedIndexes
                      }
                    }}
                              
                  />       
                </div>
              </Fragment>
          );
    }
}

function mapStateToProps(state) {
  return { products: state.products.data,
    productDelete: state.products.delete,
    productDeleteError: state.products.deleteError,
    bulkupload: state.bulkUpload.upload,
    deleteall: state.products.deleteall,
    deleteallError: state.products.deleteallError,
   };
}

export default connect(mapStateToProps, { getProducts, deleteProductAction, deleteSelectedProductAction, changeProductDeleteStatus } )(ManageProducts);