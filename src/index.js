import React from 'react';
import ReactDOM from 'react-dom';

import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';


import App from './components/App.jsx';


import rootReducer from './reducers'
  
const store = createStore(rootReducer, applyMiddleware(reduxThunk));
  
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
