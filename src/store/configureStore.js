import {createStore, applyMiddleware} from 'redux';
import {Actions} from 'react-native-router-flux'
import {LoginManager} from 'react-native-fbsdk';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

let middleware = [thunk];

if (__DEV__) {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  if (error.hasOwnProperty('response') && error.response.status === 401) {
    LoginManager.logOut();
    Actions.signup({type: "reset"});
  } else {
    return Promise.reject(error);
  }
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
}
