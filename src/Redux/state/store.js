import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/reducer'; 
import roomsSlice from '../reducer/rooms'; 
import authSlice from "../reducer/auth"
import updateUsersSlice from "../reducer/updateUser"

const rootReducer = {
  users: userReducer,
  rooms: roomsSlice, 
  register:authSlice,
  updateUser: updateUsersSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;