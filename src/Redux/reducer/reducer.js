import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/user/all');
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
    // Asegúrate de que el ID del usuario se esté pasando correctamente
    if (!userData._id) {
      throw new Error('El ID del usuario es necesario para actualizar el usuario.');
    }
  
    // Realiza la solicitud `PATCH` al endpoint correcto
    const response = await axios.patch('/api/user', userData);
    return response.data;
  });

const initialState = {
  entities: [],
  loading: false, // Estado inicial de carga
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.pending, (state) => {
        state.loading = 'loading';
      })
    .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload;
      })
    .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      })
      // Manejo de la acción updateUser
    .addCase(updateUser.pending, (state) => {
        state.loading = 'loading';
      })
    .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        // Actualizar el usuario en el estado de Redux
        const index = state.entities.findIndex(user => user._id === action.payload._id);
        if (index!== -1) {
          state.entities[index] = action.payload;
        }
      })
    .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;