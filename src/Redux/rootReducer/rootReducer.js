// src/redux/toolkit/rootReducer.js
import { combineReducers } from 'redux';
import userSlice from '../reducer/reducer';
import roomsSlice from '../reducer/rooms';

const rootReducer = combineReducers({
  auth: userSlice,
  user: roomsSlice,
});

export default rootReducer;