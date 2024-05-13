import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/reducer'; 
import roomsSlice from '../reducer/rooms'; 
import authSlice from "../reducer/auth"

const rootReducer = {
  users: userReducer,
  rooms: roomsSlice, 
  register:authSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;