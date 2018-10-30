import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import bulkUpload from './bulkUpload_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  bulkUpload: bulkUpload
});

export default rootReducer;