import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR, SIGNUP_SUCCESS, SIGNUP_FAILURE, PREFILLEMAIL} from '../actions/constants';

export default function(state={}, action) {
    let newState;
    switch(action.type) {
        case SIGNUP_SUCCESS:
            newState = { ...state, signup: action.payload };
            break;
        case SIGNUP_FAILURE:
            newState = { ...state, signuperror: action.payload };      
            break;
        case AUTHENTICATED:
            newState = { ...state, authenticated: true };
            break;
        case UNAUTHENTICATED:
            newState = { ...state, authenticated: false };
            break;
        case AUTHENTICATION_ERROR:
            newState = { ...state, error: action.payload };
            break;
        case PREFILLEMAIL:
            newState = { ...state, email: action.payload };
            break;          
        default:
            newState = {...state};
    }
    return newState;
  }