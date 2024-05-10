// reducers/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRoomsByBuilding = createAsyncThunk('rooms/fetchRoomsByBuilding', async (buildingId) => {
    console.log("Fetching rooms for building ID:", buildingId);
    const response = await axios.get(`/api/rooms/findByBuilding/${buildingId}`);
    return response.data; // Devuelve directamente los datos de las habitaciones
  });

const initialState = {
  rooms: [], // Almacena las habitaciones directamente en el estado raíz
  loading: false,
  error: null,
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
       .addCase(fetchRoomsByBuilding.pending, (state) => {
          console.log("Fetching rooms by building...")
          state.loading = 'loading';
        })
        .addCase(fetchRoomsByBuilding.fulfilled, (state, action) => {
            console.log("Data received from backend:", action.payload);
            state.loading = 'idle';
            state.rooms = action.payload; // Asegúrate de que esto contenga los datos correctos
          })
       .addCase(fetchRoomsByBuilding.rejected, (state, action) => {
          state.loading = 'idle';
          state.error = action.error;
        });
    }
  });
  
export default roomsSlice.reducer;
