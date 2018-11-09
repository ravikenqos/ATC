import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProducts  }  from './../../actions/product_action'
class ManageProducts extends Component {
    componentWillMount(){
        this.props.getProducts();
    }

    render(){
        return (
        <h1>Manage Products</h1>
        
        
        
        );
    }
}


export default connect(null, { getProducts } )(ManageProducts);

