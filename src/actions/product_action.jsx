import axios, { post } from 'axios';
import { ADD_PRODUCT, ADD_PRODUCT_ERROR } from './constants';
import {toastr} from 'react-redux-toastr'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';


//const URL = 'http://34.209.125.112/api/';

const URL = 'http://localhost:3000/api/';

export function addProductAction(formData){
    return function (dispatch) {
        console.log("formData", formData);

        // if(!formData ){
        //     dispatch({
        //         type: FILE_UPLOAD_ERROR,
        //         payload: 'Error: Please select csv file!..'
        //       });             
        // } else {
        //     const toastrOptions = {
        //         timeOut: 2000,
        //         onHideComplete: () => {
        //             dispatch({ type: FILE_UPLOADED });
        //             history.push('/manageProducts');
        //         },
                
        //     }   
            axios.post(`${URL}products`, formData)
            .then(res => {
               // toastr.success('', 'FILE_UPLOADED')
                 console.log("res", res);
                // dispatch({ type: FILE_UPLOADED });
                // history.push('/manageProducts');
              
            })
            .catch((error) => {
                console.log(error);
                // toastr.error('Error: Upload Failed!..')
                // dispatch({
                //     type: FILE_UPLOAD_ERROR,
                //     payload: 'Error: Upload Failed!..'
                // });            
            });
        }
//};
}
