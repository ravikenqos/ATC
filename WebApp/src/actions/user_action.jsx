import axios, { post } from 'axios';
import { API_URL, GET_USER, GET_USER_ERROR, SAVE_USER, SAVE_USER_ERROR } from './constants';

const URL = API_URL;


export function getUser(user_id){
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
                payload: 'Error: unable to get user'
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
                payload: res.data
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

export function changeAccStatus(status){
    return function (dispatch) {
        switch(status) {
            case "getUser":
                    dispatch({ 
                        type: GET_USER,
                        payload: false
                    });
                    break;
            case "getUserError":
                    dispatch({
                        type: GET_USER_ERROR,
                        payload: false
                    });  
                    break; 
            case "saveUser":
                    dispatch({ 
                        type: SAVE_USER,
                        payload: false
                    });
                    break;
            case "saveuserError":
                    dispatch({ 
                        type: SAVE_USER_ERROR,
                        payload: false
                    });
                break;
                            
            default:
                break;
        } 
    } 
}