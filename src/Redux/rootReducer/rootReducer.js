// src/redux/toolkit/rootReducer.js
import { combineReducers } from 'redux';
import userSlice from '../reducer/reducer';
import roomsSlice from '../reducer/rooms';
import authSlice from "../reducer/auth"

const rootReducer = combineReducers({
  auth: userSlice,
  user: roomsSlice,
  register:authSlice,
});

export default rootReducer;