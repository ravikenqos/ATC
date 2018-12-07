import { ADD_STORE, ADD_STORE_ERROR, GET_STORE, GET_STORE_ERROR, EDIT_STORE, EDIT_STORE_ERROR} from '../actions/constants';

export default function(state={}, action) {
    let newState;
    switch(action.type) {
      case ADD_STORE:
        newState = { ...state, add: true  };
        break;
      case ADD_STORE_ERROR:
        newState = { ...state, addstorerror: action.payload };
        break;      
      case GET_STORE:
        newState = { ...state, data: action.payload  };
        break;
      case GET_STORE_ERROR:
        newState = { ...state, getstorerror: action.payload };
        break;
        case EDIT_STORE:
        newState = { ...state, edit: true };
        break;
      case EDIT_STORE_ERROR:
        newState = { ...state, editstorerror: action.payload };
        break;        
    default:
        newState = {...state};

    }
    return newState;
  }