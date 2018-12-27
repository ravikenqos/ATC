import axios, { post } from 'axios';
import { API_URL, GET_CATEGORIES, GET_CATEGORIES_ERROR } from './constants';
const URL = API_URL;
export function getCategories(){
    return function (dispatch) {
        axios.get(`${URL}categories?filter[order]=name ASC`)
        .then(res => {
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            });             
        })
        .catch((error) => {
            dispatch({
                type: GET_CATEGORIES_ERROR,
                payload: 'Error to get categories'
            });            
        });
    }
//};
}