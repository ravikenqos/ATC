import axios from 'axios';

import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, SIGNUP_SUCCESS,  SIGNUP_FAILURE} from './constants';

//const URL = 'http://34.209.125.112/api/';
const URL = 'http://localhost:3000/api/';

/**
 * Sign up
 */
export function userSignup(props, history){
    return function (dispatch) {
      axios.post(`${URL}/Users`, props)
      .then(res => {
        console.log(res);
        dispatch({ type: SIGNUP_SUCCESS });
        history.push('/productbulkupload');
    })
    .catch((error) => {
        console.log(error)
        dispatch({
            type: SIGNUP_FAILURE,
            payload: 'Unable to create account'
          });            
    });

    }
  }



/**
 * Log in
 */
export function userLogin(user, history){
    return function (dispatch) {
        console.log(user);
            axios.post(`${URL}Users/login`, user)
            .then(res => {
                console.log(res);
                dispatch({ type: AUTHENTICATED });
                history.push('/productbulkupload');
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: AUTHENTICATION_ERROR,
                    payload: 'Invalid email or password'
                  });            
            });
    };
}

/**
 * Log out
 */
export function userLogout() {
    localStorage.clear();
  
    return {
      type: UNAUTHENTICATED,
    }
  }