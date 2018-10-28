import axios, { post } from 'axios';
import { FILE_UPLOADED, FILE_UPLOAD_ERROR } from './constants';
const URL = 'http://34.209.125.112/api/';



export function productBulkUploadAction(formData){
    return function (dispatch) {
        
        axios.post(`${URL}productbulkupload/upload`, user)
        .then(res => {
            console.log(res);
            dispatch({ type: FILE_UPLOADED });
           // history.push('/productbulkupload');
        })
        .catch((error) => {
            console.log(error)
            dispatch({
                type: FILE_UPLOADED,
                payload: 'Invalid email or password'
              });            
        });
};
}
