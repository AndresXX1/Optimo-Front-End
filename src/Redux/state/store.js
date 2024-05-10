import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/reducer'; // Asegúrate de que la ruta sea correcta

const rootReducer = {
  users: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;