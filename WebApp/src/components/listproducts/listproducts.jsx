import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { getProducts, deleteProductAction,  deleteSelectedProductAction, changeProductStaus}  from './../../actions/product_action';
import { getCategories  }  from './../../actions/category';

import * as Icon from 'react-feather';
import SimpleModal from './../product/SimpleModal.jsx';
import {toastr} from 'react-redux-toastr';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import './listproducts.css'

class  ListProducts extends Component {
    state = {  }
    componentWillMount(){
        this.props.getCategories();
        let loggedUser = JSON.parse(localStorage.getItem('acc'));
        if(loggedUser.storeid){
            this.props.getProducts(loggedUser.storeid);
            this.setState({store_id:loggedUser.storeid})
        }
        
    }
    constructor(props, context){
        super(props, context);
        this.columns = [ 
            {
                name: "Product Name",
                options: {
                    filter: true,
                    sort: false
                }
           },
           {
                name: "Category",
                options: {
                    filter: true,
                    sort: false
                }
            },
            {
                name: "Category_id",
                options: {
                    filter: true,
                    sort: false,
                    display:false,
                }
            },            
            {
                name: "Description",
                options: {
                    filter: true,
                    sort: false
                }
            },
            {
                name: "Image",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <img witdth="25" height="25" src={value} />
                        );
                    },      
                }
            },
            {
                name: "Price",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let price = `$${value.toFixed(2)}`;
                        return (
                            <Fragment>       
                                {price}
                            </Fragment>
                        );
                    },                     
                }
            },
            {
                name: "Update",
                options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className="mymodal">
                            <SimpleModal  modaltile={'Edit Product'} modalbutton={'Save'} 
                            rowData={tableMeta.rowData} categories={this.state.category}/>
                            <span className="deleteproduct productaction"  onClick={() => this.handleDialogOpen(tableMeta.rowData[6])}>
                            <i class="fa fa-trash" aria-hidden="true"></i></span>
                        </div>
                    );
                  },      
                
                }
            },                        
        ];

        this.state = {
            category:null,
            deleteProducts:[],
        }

    }
    getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableSelectCell: {
                root: {
                    borderBottom:'1px solid #f3f3f3'                    
                },
                checked: {
                  
                },
                checkbox: {
                    borderBottom:'1px solid #f3f3f3' 
                }
              },            
            MUIDataTableBodyCell: {
                root: {
                    fontFamily: 'Roboto',
                    fontSize: '12px',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    fontStretch: 'normal',
                    lineHeight: 'normal',
                    letterSpacing: '0.4px',
                    color:'#6f6f6f',
                    borderRadius:'5px',
                    borderBottom:'1px solid #f3f3f3',
                    webkitBorderRadius: '5px',
                    mozBorderRadius: '5px',
                    padding:'15px 56px 15px 24px'
                }
            },
            MUIDataTableToolbarSelect:{

            },
            MUIDataTableHeadCell: {
                root: {
                    color:'#3d3d3d',
                    borderBottom:'1px solid #f3f3f3'
                }
            }
        }
    })

    createRows = () => {
        console.log("products", this.props.products);
        if(this.props.products){
            let products = this.props.products;
            console.log("products", products);
            return products;
        }
    }
    
    getCategories = () => {
        if(this.props.categories) {
            return this.props.categories;
        }        
    }
    componentWillReceiveProps = (reduxprops) => {
        if(reduxprops.categories) {
            console.log("categories", reduxprops.categories);
            this.setState({
               category: reduxprops.categories
            });            
        }
    }

    deleteProduct = () => {
        this.props.deleteProductAction(this.state.deleteItem, this.props.history);
        this.handleDialogClose();
    }

    deleteSelectedProducts = (e) => {
        if(e){
  
          if(this.state.deleteProducts.length < 1){
            toastr.error('Nothing To Delete', 'Select Any Product!');
          } else {
            this.props.deleteSelectedProductAction(this.state.deleteProducts);
          }
        }
      }

    handleDialogOpen = (productid) => {
        this.setState({ deleteItem: productid });
        this.setState({ open: true });
    };
    
    handleDialogClose = () => {
        this.setState({ open: false });
    };

    showSuccess(){
        const toastrOptions = {
            timeOut: 2000,
            onHideComplete: () => {
             // this.props.changeProductUpdateStatus();
            },
        } 
        
        if(this.props.productDelete){
            this.props.getCategories();
            this.props.getProducts(this.state.store_id);
            this.props.changeProductStaus("productDelete");
            toastr.success('Delete Product', 'Success');   
        }
        if(this.props.deleteall){
            this.props.getCategories();
            this.props.changeProductStaus("deleteall");            
            this.props.getProducts(this.state.store_id);
            toastr.success('Delete Selected Product', 'Success');                        
        }
      }
   
      showFailure(){
        if(this.props.productUpdateError){
            this.props.changeProductStaus("productUpdateError");
            toastr.error('Update product', this.props.productUpdateError);
        }      
        if(this.props.deleteError){
          this.props.changeProductStaus("deleteError");          
          toastr.error('Error!');
        }
        if(this.props.deleteallError){
            this.props.changeProductStaus("deleteallError");          
            toastr.error('Error!');
          }        
      } 

     
    render() { 
        { this.showSuccess() }
        { this.showFailure() }
        const data = this.createRows();
        const options = {
            filterType: 'checkbox',
            filter:false,
            print:false,
            download:false,
            viewColumns:false,
            search:false,
            onRowsSelect: (rowsSelected, allRows) => {
                let products = [];
                allRows.forEach(row => {
                    const dataRow = data[row.dataIndex]; // this is the row in your data source
                    products.push(dataRow[6]);
                }); 
                if(products.length > 0){
                    this.state.deleteProducts = products;
                }
            },

            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
               <span className="tabledelete" onClick = { (e) => this.deleteSelectedProducts(e) }><i class="fa fa-trash fa-icons" aria-hidden="true" title="Delete products"></i></span>
            )  
        };        
        return (
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
                    <div className="reactdatagrid">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable title={"Products"} data={data} columns={this.columns} options={options} />
                        </MuiThemeProvider>
                        <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Are you want to delete ?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.deleteProduct} color="primary" autoFocus>Ok</Button>
                            <Button onClick={this.handleDialogClose} color="primary">Cancel</Button>            
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
 
  export default connect(mapStateToProps, { getProducts, deleteProductAction, deleteSelectedProductAction, changeProductStaus, getCategories} )(ListProducts);