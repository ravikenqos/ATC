import { ADD_PRODUCT, ADD_PRODUCT_ERROR, GET_PRODUCTS} from '../actions/constants'

export default function(state={}, action) {
  console.log("actionreducer", action.type);
  console.log("action", action.payload);
    switch(action.type) {
      case ADD_PRODUCT:
        return { ...state, add: true };
      case ADD_PRODUCT_ERROR:
        return { ...state, error: action.payload };
      case GET_PRODUCTS:
        return { ...state, data: action.payload };
    }
    return state;
  }