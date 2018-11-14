import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';


import { getProducts  }  from './../../actions/product_action';
import logoLight from '../../assets/atclightlogo.png';

import './product.css';
import * as Icon from 'react-feather';
class ImageFormater extends React.Component {
  render() {
    return (<div></div>);
  }
}

class MyFormatter extends React.Component {
  render(){
    return(
      <div>
        <span><i class="fas fa-pencil-alt"></i></span>
        <span><i class="fa fa-trash" aria-hidden="true"></i></span>
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
        { key: 'producname', name: 'Product Name', width: 170 },
        { key: 'description', name: 'Description', width: 170 },
        { key: 'image', name: 'Image', resizable: true, width: 170},
        { key: 'price', name: 'Price', width: 170 },
        { key: 'update', name: 'Update', width: 170, formatter: MyFormatter},
      ];

      this.state = { rows: null, selectedIndexes: [] };
    }
    createRows = () => {
      let rows = [];
      let products = this.props.products;
      if(products){
        products.map((items) => {
          rows.push({
             producname: items.title,
             description: items.description,
             image: items.image,
             price: items.price,
             update: this.updateActions()
            });        
          });       
      
      }  
      this._rows = rows;
    };
   
    updateActions(){
      return "edit delete";
    }

    getCellActions(column, row) {
      // if (column.key === 'update') {
      //   return(<Icon.Box size={20} color="white"/>); 
      // }     
    }  

    rowGetter = (i) => {
      return this._rows[i];
    };

    onRowsSelected = (rows) => {
      this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
    };

    onRowsDeselected = (rows) => {
      let rowIndexes = rows.map(r => r.rowIdx);
      this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
    };

    render() {
      this.createRows();
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

                <div className="bulkuploadform">
                  <ReactDataGrid
                    enableCellSelect={true}
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this._rows.length}
                    minHeight={500}
                    rowHeight={50}
                    minColumnWidth={170}
                    rowSelection={{
                      showCheckbox: true,
                      enableShiftSelect: true,
                      onRowsSelected: this.onRowsSelected,
                      onRowsDeselected: this.onRowsDeselected,
                      selectBy: {
                        indexes: this.state.selectedIndexes
                      }
                    }}
                    getCellActions={this.getCellActions}          
                  />       
                </div>
              </Fragment>
          );
    }
}

function mapStateToProps(state) {
  return { products: state.products.data };
}

export default connect(mapStateToProps, { getProducts } )(ManageProducts);
