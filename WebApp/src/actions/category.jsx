import axios, { post } from 'axios';
import { API_URL, GET_CATEGORIES, GET_CATEGORIES_ERROR } from './constants';
const URL = API_URL;
export function getCategories(){
    console.log("getcategories");
    return function (dispatch) {
        axios.get(`${URL}categories`)
        .then(res => {
            console.log("category", res);
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