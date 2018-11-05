import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/constants';

export default function(state={}, action) {
    switch(action.type) {
      case SIGNUP_SUCCESS:
        return { ...state, authenticated: true };
      case SIGNUP_FAILURE:
        return { ...state, authenticated: false, error: { signup: action.payload } };      
      case AUTHENTICATED:
        return { ...state, authenticated: true };
      case UNAUTHENTICATED:
        return { ...state, authenticated: false };
      case AUTHENTICATION_ERROR:
        return { ...state, error: action.payload };
    }
    return state;
  }