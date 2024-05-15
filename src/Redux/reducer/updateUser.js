import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ajusta esto según la configuración de tu backend
});

// Definimos una función asincrónica para realizar la solicitud de actualización de usuario
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Hacemos la solicitud PATCH al endpoint /api/user
      const response = await api.patch('/api/user', userData);
      // Devolvemos los datos de la respuesta
      return response.data;
    } catch (error) {
      // Si hay un error, lo manejamos y lo devolvemos junto con la acción
      return rejectWithValue(error.response.data);
    }
  }
);

//action para el cambio de password

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const { oldestPassword, newPassword } = passwordData;
      const token = localStorage.getItem('Token'); // Asegúrate de que el nombre del token coincida
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      console.log('Datos enviados a la API:', { oldestPassword, newPassword });
      console.log('Token enviado en los encabezados:', headers);

      const response = await api.patch('/api/auth/change-password', { oldestPassword, newPassword }, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Creamos el slice para manejar el estado y las acciones relacionadas con la actualización de usuarios
const updateUsersSlice = createSlice({
  name: 'updateUsers',
  initialState: {
    loading: false, // Indicador de carga
    error: null,    // Mensaje de error en caso de que ocurra uno
    success: false,  // Indicador de éxito de la operación
    
  },
  reducers: {},
  extraReducers: builder => {
    // Agregamos un caso para manejar la acción cuando la solicitud se completa con éxito
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;  // Desactivamos el indicador de carga
      state.error = null;     // Limpiamos el mensaje de error
      state.success = true;   // Indicamos que la operación fue exitosa
    });
    // Agregamos un caso para manejar la acción cuando la solicitud es rechazada (falla)
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;         // Desactivamos el indicador de carga
      state.error = action.payload;  // Guardamos el mensaje de error
      state.success = false;         // Indicamos que la operación no fue exitosa
    });
    // Agregamos un caso para manejar la acción cuando la solicitud está en proceso
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;   // Activamos el indicador de carga
      state.error = null;     // Limpiamos el mensaje de error
      state.success = false;  // Reiniciamos el indicador de éxito
    })

    //casos para cambio de password
    builder
 .addCase(changePassword.pending, (state) => {
    state.loading = true;   // Activamos el indicador de carga
    state.error = null;     // Limpiamos el mensaje de error
    state.success = false;  // Reiniciamos el indicador de éxito
  })
 .addCase(changePassword.fulfilled, (state, action) => {
    state.loading = false;  // Desactivamos el indicador de carga
    state.error = null;     // Limpiamos el mensaje de error
    state.success = true;   // Indicamos que la operación fue exitosa
  })
 .addCase(changePassword.rejected, (state, action) => {
    state.loading = false;         // Desactivamos el indicador de carga
    state.error = action.payload;  // Guardamos el mensaje de error
    state.success = false;         // Indicamos que la operación no fue exitosa
  });
  },
});

// Exportamos las acciones y el reducer del slice
export default updateUsersSlice.reducer;