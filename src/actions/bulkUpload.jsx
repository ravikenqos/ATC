import axios, { post } from 'axios';
import { FILE_UPLOADED, FILE_UPLOAD_ERROR } from './constants';
import {toastr} from 'react-redux-toastr'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';


const URL = 'http://34.209.125.112/api/';

//const URL = 'http://localhost:3000/api/';

export function productBulkUploadAction(formData, history){
    return function (dispatch) {
        console.log(formData);

        if(!formData ){
            dispatch({
                type: FILE_UPLOAD_ERROR,
                payload: 'Error: Please select csv file!..'
              });             
        } else {
            const toastrOptions = {
                timeOut: 2000,
                onHideComplete: () => {
                    dispatch({ type: FILE_UPLOADED });
                    history.push('/manageProducts');
                },
                
            }   
            axios.post(`${URL}ProductbulkUploads/uploads`, formData)
            .then(res => {
               // toastr.success('', 'FILE_UPLOADED')
                // console.log("res", res);
                // dispatch({ type: FILE_UPLOADED });
                // history.push('/manageProducts');
                toastr.success('Bulk Upload', 'File_Uploaded', toastrOptions)
            })
            .catch((error) => {
                toastr.error('Error: Upload Failed!..')
                dispatch({
                    type: FILE_UPLOAD_ERROR,
                    payload: 'Error: Upload Failed!..'
                });            
            });
        }
};
}
