import { ADD_PRODUCT, ADD_PRODUCT_ERROR, GET_PRODUCTS, UPDATE_PRODUCT, UPDATE_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, DELETE_ALL_PRODUCT, DELETE_ALL_PRODUCT_ERROR } from '../actions/constants'

export default function(state={}, action) {
  console.log("actionreducer", action.type);
  console.log("action", action.payload);
    switch(action.type) {
      case ADD_PRODUCT:
        return { ...state, add: true };
      case ADD_PRODUCT_ERROR:
        return { ...state, addError: action.payload };
      case GET_PRODUCTS:
        return { ...state, data: action.payload };
      case UPDATE_PRODUCT:
        return { ...state, update: action.payload };
      case UPDATE_PRODUCT_ERROR:
        return { ...state, updateError: action.payload };
      case DELETE_PRODUCT:
        return { ...state, delete: action.payload };
      case DELETE_PRODUCT_ERROR:
        return { ...state, deleteError: action.payload };
      case DELETE_ALL_PRODUCT:
        return { ...state, deleteall: true };
      case DELETE_ALL_PRODUCT_ERROR:
        return { ...state, deleteallError: action.payload };                 
    }
    console.log("state", state);
    return state;
  }