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
        // Asegúrate de que estás accediendo a la propiedad correcta del objeto de error
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    token: null,
    role: null,
    decodedToken: null // Asegúrate de que esta línea esté presente
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.access_Token;
        state.decodedToken = parseJwt(action.payload.access_Token);
        if (state.decodedToken && state.decodedToken.role) {
          console.log("decodedtoken", state.decodedToken);
          state.role = state.decodedToken.role;
        }
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

export default authSlice.reducer;