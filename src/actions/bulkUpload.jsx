import axios, { post } from 'axios';
import { FILE_UPLOADED, FILE_UPLOAD_ERROR } from './constants';
//const URL = 'http://34.209.125.112/api/';

const URL = 'http://localhost:3000/api/';

export function productBulkUploadAction(formData, history){
    return function (dispatch) {
        console.log(formData);

        if(!formData ){
            dispatch({
                type: FILE_UPLOAD_ERROR,
                payload: 'Error: Please select csv file!..'
              });             
        } else {
            axios.post(`${URL}ProductbulkUploads/uploads`, formData)
            .then(res => {
                console.log("res", res);
                dispatch({ type: FILE_UPLOADED });
                history.push('/manageProducts');
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: FILE_UPLOAD_ERROR,
                    payload: 'Error: Upload Failed!..'
                });            
            });
        }
};
}
