import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import parseJwt from '../../utils/jwtUtils';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajusta esto según tu configuración de backend
});

export const registerUser = createAsyncThunk(
    'auth/registerUser',

    async (userData, { rejectWithValue }) => {

      try {

        const response = await api.post('/api/auth/register', userData);

        return response.data;

      } catch (error) {
       
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  

export const loginUser = createAsyncThunk(

  'auth/loginUser',

  async (loginData, { rejectWithValue }) => {

    try {
      const response = await api.post('/api/auth/login', loginData);

      return response.data;

    } catch (error) {

      return rejectWithValue(error.response.data);

    }
  }

);


export const updateUserData = createAsyncThunk(

  'auth/updateUserData',

  async (userData, { rejectWithValue, getState }) => {

    try {

      const { auth } = getState();

      const response = await api.put(`/api/users/${auth.decodedToken.userId}`, userData, {

        headers: {
          
          Authorization: `Bearer ${auth.token}`,

        },
      });

      return response.data;

    } catch (error) {

      return rejectWithValue(error.response.data);

    }
  }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      loading: false,
      error: null,
      token: null,
      role: null,
      decodedToken: null
    },
    reducers: {
      clearAuthState: state => {
        state.loading = false;
        state.error = null;
        state.token = null;
        state.role = null;
        state.decodedToken = null;
      }
    },
    extraReducers: builder => {
      builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.access_Token; // Guarda el token sin decodificar
        state.decodedToken = parseJwt(action.payload.access_Token); // Decodifica el token
        console.log("decodedtoken", state.decodedToken);
        if (state.decodedToken && state.decodedToken.role) {
          state.role = state.decodedToken.role;
        }
      
        // Guarda ambos tokens en localStorage
        localStorage.setItem('Token', action.payload.access_Token); // Token sin decodificar
        localStorage.setItem('decodedToken', JSON.stringify(state.decodedToken)); // Token decodificado
      })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(registerUser.pending, state => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, state => {
          state.loading = false;
          state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { clearAuthState } = authSlice.actions;
  
  export default authSlice.reducer;