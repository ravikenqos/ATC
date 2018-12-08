import { API_URL, GET_CATEGORIES, GET_CATEGORIES_ERROR } from '../actions/constants';

export default function(state={}, action) {
    switch(action.type) {
      case GET_CATEGORIES:
        return { ...state, data: action.payload };
      case GET_CATEGORIES_ERROR:
        return { ...state, category_error: action.payload };
    }
    return state;
  }