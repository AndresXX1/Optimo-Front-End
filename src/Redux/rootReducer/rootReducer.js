import { combineReducers } from 'redux';
import userReducer from '../reducer/reducer'; // Asegúrate de que la ruta sea correcta
import roomsSlice from '../reducer/rooms';
import authSlice from "../reducer/auth"

const rootReducer = combineReducers({
  user: userReducer, // Asegúrate de que el nombre coincida con cómo lo usas en tu aplicación
  rooms: roomsSlice,
  auth: authSlice, // Usa 'auth' para ser consistente con cómo intentas acceder al estado
});

export default rootReducer;