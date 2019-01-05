import {PREFILLEMAIL} from '../actions/constants';

export default function(state={}, action) {
    let newState;
    switch(action.type) {
        case PREFILLEMAIL:
            newState = { ...state, email: action.payload };
            break;   
        default:
        newState = {...state};
    }
    return newState;
  }