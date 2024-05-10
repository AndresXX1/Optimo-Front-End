// src/redux/toolkit/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from '../reducer/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Agrega aquí otros reducers
});

export default rootReducer;