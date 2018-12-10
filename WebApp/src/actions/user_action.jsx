import axios, { post } from 'axios';
import { API_URL, GET_USER, GET_USER_ERROR, SAVE_USER, SAVE_USER_ERROR } from './constants';

const URL = API_URL;


export function getUser(user_id, access_token){
    return function (dispatch) {
        let data = {
            userid : user_id
        }
        axios.post(`${URL}store/getaccdetails`, data)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });              
        })
        .catch((error) => {
            dispatch({
                type: GET_USER_ERROR,
                payload: 'Error: unable to user'
            });            
         });
    }
}


export function saveUser(data){
    return function (dispatch) {
        //const data = { user_id: data.user_id, businessname: data.user_id }
        axios.post(`${URL}store/user`, data)
        .then(res => {
            dispatch({
                type: SAVE_USER,
                payload: true
            });              
        })
        .catch((error) => {
            dispatch({
                type: SAVE_USER_ERROR,
                payload: 'Error: unable to save'
            });            
        });
    }
}

// export function changeAccStatus(data){
//     return function (dispatch) {
//         switch(status) {
//             case "getUser":
//                     dispatch({ 
//                         type: UPDATE_PRODUCT,
//                         payload: false
//                     });
//                     break;
//             case "getUserError":
//                     dispatch({
//                         type: UPDATE_PRODUCT_ERROR,
//                         payload: false
//                     });  
//                     break; 
//             case "productDelete":
//                     dispatch({ 
//                         type: DELETE_PRODUCT,
//                         payload: false
//                     });
//                     break;
//             case "deleteError":
//                     dispatch({ 
//                         type: DELETE_PRODUCT_ERROR,
//                         payload: false
//                     });
//                 break;
                            
//             default:
//                 break;
//         } 
//     } 
// }