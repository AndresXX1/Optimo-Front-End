import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async ({ filter, userId }) => {
    try { 
        const url = `/api/bookings?filter=${filter}&id=${userId}`;
        const response = await axios.get(url);

        return response.data;

    } catch (error) {
        throw Error('Failed to fetch bookings');
    }
});

export const createBooking = createAsyncThunk(
    'bookings/createBooking',
    async (bookingData, { rejectWithValue }) => {
      try {
        
        const token = localStorage.getItem('Token');
       
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        // Realiza la solicitud POST al endpoint /api/bookings con los datos de la reserva y los encabezados
        const response = await axios.post('/api/bookings', bookingData, { headers });
        
        // Devuelve los datos de la respuesta
        return response.data;
      } catch (error) {
        // Si hay un error, maneja el error y devuélvelo junto con la acción
        return rejectWithValue(error.response.data);
      }
    }
  );

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: [], 
        loading: false, 
        error: null, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false; 
                state.bookings = action.payload; 
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.error.message;
            })
            builder
           
            .addCase(createBooking.pending, (state) => {
              state.loading = true;  
              state.error = null;     
            })
            
            .addCase(createBooking.fulfilled, (state, action) => {
              state.loading = false;  
              state.error = null;     
             
              state.bookings.push(action.payload); 
            })
            
            .addCase(createBooking.rejected, (state, action) => {
              state.loading = false;         
              state.error = action.payload; 
            });
    },
});

export default bookingsSlice.reducer;