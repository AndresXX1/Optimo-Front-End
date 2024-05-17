import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/reducer'; 
import roomsSlice from '../reducer/rooms'; 
import authSlice from "../reducer/auth"
import updateUsersSlice from "../reducer/updateUser"
import buildingsSlice from "../reducer/building"
import bookingsSlice from "../reducer/bookings"

const rootReducer = {
  users: userReducer,
  rooms: roomsSlice, 
  register:authSlice,
  updateUser: updateUsersSlice,
  building: buildingsSlice,
  bookings:bookingsSlice
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;