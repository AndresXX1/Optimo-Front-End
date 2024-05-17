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
        // Obtén el token de autenticación del localStorage
        const token = localStorage.getItem('Token');
        // Crea los encabezados de la solicitud con el token de autenticación
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
            // Agrega un caso para manejar la acción cuando la solicitud está pendiente
            .addCase(createBooking.pending, (state) => {
              state.loading = true;   // Activa el indicador de carga
              state.error = null;     // Limpia el mensaje de error
            })
            // Agrega un caso para manejar la acción cuando la solicitud se completa con éxito
            .addCase(createBooking.fulfilled, (state, action) => {
              state.loading = false;  // Desactiva el indicador de carga
              state.error = null;     // Limpia el mensaje de error
              // Actualiza el estado con la nueva reserva agregada
              state.bookings.push(action.payload); 
            })
            // Agrega un caso para manejar la acción cuando la solicitud es rechazada (falla)
            .addCase(createBooking.rejected, (state, action) => {
              state.loading = false;         // Desactiva el indicador de carga
              state.error = action.payload;  // Guarda el mensaje de error
            });
    },
});

export default bookingsSlice.reducer;