import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Modal from '@material-ui/core/Modal';
import { getProducts, deleteProductAction,  deleteSelectedProductAction, changeProductUpdateStatus, changeProductDeleteStatus }  from './../../actions/product_action';
import { getCategories  }  from './../../actions/category';
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
      let store_id = 7;
      this.props.getProducts(store_id);
      this.props.getCategories();
    }

    constructor(props, context){
      super(props, context);
     
      this._columns = [
        { key: 'producname', name: 'Product Name', width:165 },
        { key: 'category', name: 'Category', width: 155 },
        { key: 'description', name: 'Description', width: 190 },
        { key: 'image', name: 'Image', resizable: true, width: 100, formatter: (props)=>(this.renderImage(props.row.rowData))},
        { key: 'price', name: 'Price', width: 100, formatter: (props)=>(this.formatCurrency(props.row.rowData))},
        { key: 'update', name: 'Update', width: 140,  formatter: (props)=>(this.updateActions(props.row.rowData))},
      ];

      this.state = { rows: null, selectedIndexes: [], rowData:null, deleteProducts:[], deleteItem:null};
      this.onRowsSelected = this.onRowsSelected.bind(this);
      this.deleteSelectedProducts = this.deleteSelectedProducts.bind(this);
      this.openSimpleModal = this.openSimpleModal.bind(this);
      this.deleteProduct = this.deleteProduct.bind(this);
      this.handleDialogOpen = this.handleDialogOpen.bind(this);
      this.handleDialogClose = this.handleDialogClose.bind(this);
    }
    createRows = () => {
      let rows = [];
      let products = this.props.products;
      if(products){
        products = products.data;
        products.map((items) => {
          rows.push({
             id:items.id,
             producname: items.title,
             category: items.category_name,
             description: items.description,
             image: items.image,
             price: items.price,
             category_id:items.category_id,
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
          <img className="rowProductImage" src={item.product_image} width="50" height="50"/>
        </Fragment>
      );
    }
    formatCurrency(items){
      let price = items.price;
      price = `$${price.toFixed(2)}`;

     return(
      <Fragment>       
          {price}
      </Fragment>    
     );
    }
    
    updateActions(items){
      items.formTitle = 'Edit Product';
      items.formAction = 'Save';    
     return(
       <Fragment>
        <SimpleModal rowData={items} categories={this.props.categories}/>
        <span className="deleteproduct productaction" onClick={() => this.handleDialogOpen(items)}><i class="fa fa-trash" aria-hidden="true"></i></span>
      </Fragment>
     );
    }

    deleteProduct(){
      this.props.deleteProductAction(this.state.deleteItem, this.props.history);
      this.handleDialogClose();
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
           // this.props.changeProductUpdateStatus();
          },
      } 
       if(this.props.productUpdate){
         this.props.getProducts();
    // //    this.props.changeProductUpdateStatus();
    //     toastr.success('Update product', 'Success');
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
      if(this.props.productUpdateError){
          toastr.error('Update product', this.props.productUpdateError);
      }      
      if(this.props.deleteError){
        toastr.error('Error!');
      }
    } 

    openSimpleModal() {
      this.setState({simpleModalVisibility: true});
    }

    handleDialogOpen = (items) => {
      this.setState({ deleteItem: items.id });
      this.setState({ open: true });
      
    };
  
    handleDialogClose = () => {
      this.setState({ open: false });
    };

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



                  <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
       <DialogTitle id="alert-dialog-title">{"Are you want to delete ?"}</DialogTitle>
 
          <DialogActions>
            <Button onClick={this.deleteProduct} color="primary" autoFocus>
              Ok
            </Button>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>            
          </DialogActions>
        </Dialog>

                </div>
              </Fragment>
          );
    }
}

function mapStateToProps(state) {
  return {
    products: state.products.data,
    categories: state.categories.data,
    productUpdate: state.products.update,
    productUpdateError: state.products.updateError,
    productDelete: state.products.delete,
    productDeleteError: state.products.deleteError,
    bulkupload: state.bulkUpload.upload,
    deleteall: state.products.deleteall,
    deleteallError: state.products.deleteallError,
   };
}

export default connect(mapStateToProps, { getProducts, deleteProductAction, deleteSelectedProductAction, changeProductUpdateStatus, changeProductDeleteStatus, getCategories} )(ManageProducts);