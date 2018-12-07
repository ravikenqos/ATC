import axios, { post } from 'axios';
import { API_URL, ADD_STORE, ADD_STORE_ERROR, GET_STORE, GET_STORE_ERROR, EDIT_STORE, EDIT_STORE_ERROR} from './constants';

const URL = API_URL;

export function addStore(formData, history){
    return function (dispatch) {

        axios.post(`${URL}store/add`, formData)
        .then(res => {
            console.log(res);
           //localStorage.setItem('store', );  
            dispatch({type: ADD_STORE});
            history.push('/store');              
        })
        .catch((error) => {
            dispatch({
                type: ADD_STORE_ERROR,
                payload: 'Error: Add store Failed!..'
            }); 
           // history.push('/store');           
        });
    }
//};
}


export function getStore(store_id){
    return function (dispatch) {

        axios.get(`${URL}store/getstore/${store_id}`)
        .then(res => {
            console.log("getstore", res.data.data[0]);

            dispatch({
                type: GET_STORE,
                payload: res.data.data[0]
            });              
        })
        .catch((error) => {
            dispatch({
                type: GET_STORE_ERROR,
                payload: 'Error:'+ error
            });            
        });
    }
//};
}

export function editStore(formData, history){
    return function (dispatch) {
        axios.post(`${URL}store/edit`, formData)
        .then(res => {
            dispatch({
                type: EDIT_STORE,
            }); 
            history.push('/store');             
        })
        .catch((error) => {
            dispatch({
                type: EDIT_STORE_ERROR,
                payload: 'Error:'+ error
            });            
        });
    }
}