import axios, { post } from 'axios';
import { API_URL, FILE_UPLOADED, FILE_UPLOAD_ERROR } from './constants';
import {toastr} from 'react-redux-toastr'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const URL = API_URL;

export function productBulkUploadAction(formData, history){
    return function (dispatch) {
        if(formData ){
            axios.post(`${URL}ProductbulkUploads/uploads`, formData)
            .then(res => {
                dispatch({ type: FILE_UPLOADED });
                
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
