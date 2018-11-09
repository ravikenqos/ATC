import { ADD_PRODUCT, ADD_PRODUCT_ERROR } from '../actions/constants'

export default function(state={}, action) {
  console.log("action", action);
    switch(action.type) {
      case ADD_PRODUCT:
        return { ...state, add: true };
      case ADD_PRODUCT_ERROR:
        return { ...state, error: action.payload };

    }
    return state;
  }