import axios, { post } from 'axios';
import { API_URL, ADD_PRODUCT, ADD_PRODUCT_ERROR, GET_PRODUCTS, UPDATE_PRODUCT, UPDATE_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, DELETE_ALL_PRODUCT, DELETE_ALL_PRODUCT_ERROR } from './constants';
import {toastr} from 'react-redux-toastr';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const URL = API_URL;

export function addProductAction(formData, history){
    return function (dispatch) {
        const toastrOptions = {
            timeOut: 2000,
            onHideComplete: () => {
                dispatch({ type: ADD_PRODUCT });
                history.push('/listproducts');
            },
        } 

        axios.post(`${URL}products/add`, formData)
        .then(res => {
            toastr.success('Bulk Upload', 'File_Uploaded', toastrOptions)
        })
        .catch((error) => {
            console.log(error);

            dispatch({
                type: ADD_PRODUCT_ERROR,
                payload: 'Error: Add Product Failed!..'
            });            
        });
    }
//};
}


export function getProducts(store_id){
    return function (dispatch) {

        axios.get(`${URL}products/appproductsbystore/${store_id}`)
        .then(res => {
            console.log("pro", res.data);
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data.data
            });             
        })
        .catch((error) => {
            dispatch({
                type: ADD_PRODUCT_ERROR,
                payload: 'Error: No Products!..'
            });            
        });
    }
}

export function updateProductAction(formData, history){
    return function (dispatch) {

        axios.post(`${URL}products/edit`, formData)
        .then(res => {
            dispatch({ type: UPDATE_PRODUCT,
                       payload: true
                      });
        })
        .catch((error) => {
            dispatch({
                type: UPDATE_PRODUCT_ERROR,
                payload: error
            });            
        });
    }
//};
}

export function changeProductStaus(status){
    return function (dispatch) {
        switch(status) {
            case "productUpdate":
                    dispatch({ 
                        type: UPDATE_PRODUCT,
                        payload: false
                    });
                    break;
            case "productUpdateError":
                    dispatch({
                        type: UPDATE_PRODUCT_ERROR,
                        payload: false
                    });  
                    break; 
            case "productDelete":
                    dispatch({ 
                        type: DELETE_PRODUCT,
                        payload: false
                    });
                    break;
            case "deleteError":
                    dispatch({ 
                        type: DELETE_PRODUCT_ERROR,
                        payload: false
                    });
                break;
            case "deleteall":
                dispatch({ 
                    type: DELETE_ALL_PRODUCT,
                    payload: false
                });
                break;
            case "deleteallError":
                dispatch({ 
                    type: DELETE_ALL_PRODUCT_ERROR,
                    payload: false
                });
                break;                               
            default:
                break;
        } 
    }           
}



export function deleteProductAction(product_id, history){
    return function (dispatch) {
        axios.delete(`${URL}products/`+product_id)
        .then(res => {
            dispatch({ 
                type: DELETE_PRODUCT,
                payload: true
            });
        })
        .catch((error) => {
            dispatch({
                type: DELETE_PRODUCT_ERROR,
                payload: error
            });            
        });
    }
//};
}


export function deleteSelectedProductAction(products, history){
    return function (dispatch) {
        axios.post(`${URL}products/deleteselect`, products)
        .then(res => {
            dispatch({ type: DELETE_ALL_PRODUCT });
        })
        .catch((error) => {
            dispatch({
                type: DELETE_ALL_PRODUCT_ERROR,
                payload: error
            });            
        });
    }
//};
}
