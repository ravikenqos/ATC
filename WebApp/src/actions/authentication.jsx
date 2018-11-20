import axios from 'axios';

import { API_URL, AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, SIGNUP_SUCCESS,  SIGNUP_FAILURE} from './constants';

const URL = API_URL;

/**
 * Check Authentication
 * 
  */

 export function authenticate(){
     return function (dispatch) {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("user", user);
        if (user) {
            console.log(AUTHENTICATED);
            dispatch({ type: AUTHENTICATED });
        } else {
            console.log(UNAUTHENTICATED);
            dispatch({ type: UNAUTHENTICATED });
        }

     }
  }


/**
 * Sign up
 */
export function userSignup(props, history){
    return function (dispatch) {
      axios.post(`${URL}Users`, props)
      .then(res => {
        console.log(res);
        dispatch({ type: SIGNUP_SUCCESS });
      //  history.push('/productbulkupload');
      history.push('/');
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
                localStorage.setItem('user', JSON.stringify(res.data));

                dispatch({ type: AUTHENTICATED });
                //history.push('/productbulkupload');
                history.push('/');
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
export function userLogout(history) {
    return function (dispatch) {
        localStorage.clear();
        dispatch({ type: UNAUTHENTICATED});
        history.push('/');
    }
  }