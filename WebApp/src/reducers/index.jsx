import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';

import {reducer as toastrReducer} from 'react-redux-toastr'

import authReducer from './auth_reducer';
import bulkUpload from './bulkUpload_reducer';
import products from './product_reducer';
import categories from './category_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  auth: authReducer,
  bulkUpload: bulkUpload,
  products: products,
  categories: categories
});

export default rootReducer;