import axios, { post } from 'axios';
import { ADD_PRODUCT, ADD_PRODUCT_ERROR } from './constants';
import {toastr} from 'react-redux-toastr'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';


const URL = 'http://34.209.125.112/api/';

//const URL = 'http://localhost:3000/api/';

export function addProductAction(formData, history){
    return function (dispatch) {
        const toastrOptions = {
            timeOut: 2000,
            onHideComplete: () => {
                dispatch({ type: ADD_PRODUCT });
                history.push('/manageProducts');
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


export function getProducts(){
    return function (dispatch) {


        axios.get(`${URL}products`)
        .then(res => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);

            // dispatch({
            //     type: ADD_PRODUCT_ERROR,
            //     payload: 'Error: Add Product Failed!..'
            // });            
        });
    }
//};
}