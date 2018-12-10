import { ADD_PRODUCT, ADD_PRODUCT_ERROR, GET_PRODUCTS, UPDATE_PRODUCT, UPDATE_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, DELETE_ALL_PRODUCT, DELETE_ALL_PRODUCT_ERROR } from '../actions/constants'

export default function(state={}, action) {
    switch(action.type) {
      case ADD_PRODUCT:
        return { ...state, add: action.payload };
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
        return { ...state, deleteall: action.payload };
      case DELETE_ALL_PRODUCT_ERROR:
        return { ...state, deleteallError: action.payload };
    }
    return state;
  }