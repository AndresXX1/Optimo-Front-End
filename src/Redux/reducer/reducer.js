import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
  try {
    const response = await axios.patch('/api/user', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/user/all');
  return response.data;
});

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await axios.get('/api/bookings?filter=all');
  return response.data;
});

export const fetchBuildings = createAsyncThunk('buildings/fetchBuildings', async () => {
  const response = await axios.get('/api/buildings'); // Endpoint para obtener datos de edificios
  return response.data;
});

export const updateBuilding = createAsyncThunk('buildings/updateBuilding', async ({ id, updatedBuilding }) => {
    try {
      const response = await axios.patch(`/api/buildings/${id}`, updatedBuilding);
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  


  

const initialState = {
  rooms: [], // Almacena las habitaciones directamente en el estado raíz
  loading: false,
  error: null,
  entities: []
  
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
      .addCase(updateUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        const index = state.entities.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities.push(...action.payload); // Agregar las nuevas reservas a la lista existente
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      })
      .addCase(fetchBuildings.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload; // Almacenar los datos de los edificios en el estado
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      })

  }
});

export default userSlice.reducer;