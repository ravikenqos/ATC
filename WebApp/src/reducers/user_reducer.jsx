import { ADD_STORE, GET_USER, GET_USER_ERROR, SAVE_USER, SAVE_USER_ERROR} from '../actions/constants';

export default function(state={}, action) {
    let newState;
    switch(action.type) {
        case GET_USER:
            newState = { ...state, data: action.payload  };
            break;
        case GET_USER_ERROR:
            newState = { ...state, usererror: action.payload };
            break; 
        case SAVE_USER:
            newState = { ...state, save: action.payload  };
            break;
        case SAVE_USER_ERROR:
            newState = { ...state, saveusererror: action.payload };
            break;                  
        default:
            newState = {...state};

    }
    return newState;
  }