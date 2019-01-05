import axios from 'axios';

import { API_URL, AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, SIGNUP_SUCCESS,  SIGNUP_FAILURE, PREFILLEMAIL} from './constants';

const URL = API_URL;

/**
 * Check Authentication
 * 
  */

 export function authenticate(){
     return function (dispatch) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: AUTHENTICATED });
        } else {
            dispatch({ type: UNAUTHENTICATED });
        }

     }
  }


/**
 * Sign up
 */
export function userSignup(props, accesstoken, history){
    return function (dispatch) {
      axios.post(`${URL}Users`, props)
      .then(res => {
          if(accesstoken === null){
                dispatch({
                         type: SIGNUP_SUCCESS,
                         payload: true
                       });
          }  else {
            let data = {
                userid: res.data.id,
                accesstoken:accesstoken
            }
            axios.post(`${URL}shopify/saveUserId`, data)
            .then(res => {
                localStorage.removeItem("shopifyuser");
                dispatch({
                         type: SIGNUP_SUCCESS,
                         payload: true
                       });
            })
        }
    })
    .catch((error) => {
        let err = error.response.data.error;
        if(err.statusCode === 422){
            dispatch({
                type: SIGNUP_FAILURE,
                payload: "Email already exists"
              });
        } else {
            dispatch({
                type: SIGNUP_FAILURE,
                payload: 'Unable to create account'
            });
        } 
    });

    }
  }

export function userActionStatus(status){
    return function (dispatch) {
        switch(status) {
            case "signup":
                    dispatch({ 
                        type: SIGNUP_SUCCESS,
                        payload: false
                    });
                    break;
            case "signupError":
                    dispatch({
                        type: SIGNUP_FAILURE,
                        payload: false
                    });  
                    break;
            case "authenticationError":
                    dispatch({
                        type: AUTHENTICATION_ERROR,
                        payload: false
                    });  
                    break;                     
            default:
                break;
        } 
    }        
}

/**
 * Log in
 */
export function userLogin(user, history){
    return function (dispatch) {
            axios.post(`${URL}Users/login`, user)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch({ type: AUTHENTICATED });
                history.push('/dashboard');
            })
            .catch((error) => {
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

/**
 * prefill email
 */
export function prefillEmail(email) {
    return function (dispatch) {
        dispatch({ 
            type: PREFILLEMAIL,
            payload:  email       
        });
       
    }
  }  