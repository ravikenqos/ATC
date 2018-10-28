import axios from 'axios';

import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from './constants';

const URL = 'http://34.209.125.112/api/';

/**
 * Log in
 */
export function userLogin(user, history){
    return function (dispatch) {
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