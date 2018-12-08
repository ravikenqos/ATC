import axios, { post } from 'axios';
import { API_URL, GET_USER, GET_USER_ERROR, SAVE_USER, SAVE_USER_ERROR } from './constants';

const URL = API_URL;


export function getUser(user_id, access_token){
    return function (dispatch) {
        let url = `${URL}Users/${user_id}?access_token=${access_token}`;
        axios.get(url)
        .then(res => {
            // console.log("getUser", res.data);
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