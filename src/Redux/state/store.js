import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/reducer'; // Asegúrate de que la ruta sea correcta
import roomsSlice from '../reducer/rooms'; // Asegúrate de que la ruta sea correcta

const rootReducer = {
  users: userReducer,
  rooms: roomsSlice, // Incluye el reducer de habitaciones
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;