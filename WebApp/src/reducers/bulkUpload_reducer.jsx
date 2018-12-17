import { FILE_UPLOADED, FILE_UPLOAD_ERROR } from '../actions/constants';

export default function(state={}, action) {
    switch(action.type) {
      case FILE_UPLOADED:
        return { ...state, upload: action.payload };
      case FILE_UPLOAD_ERROR:
        return { ...state, error: action.payload };

    }
    return state;
  }