import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});


export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
  
      const response = await api.patch('/api/user', userData);
      
      return response.data;

    } catch (error) {
     
      return rejectWithValue(error.response.data);
    }
  }
);




export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const { oldestPassword, newPassword } = passwordData;
      const token = localStorage.getItem('Token'); 

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


export const changeEmail = createAsyncThunk(
  'auth/changeEmail',
  async (emailData, { rejectWithValue }) => {

    try {

      const { newEmail, password } = emailData;

      const token = localStorage.getItem('Token'); 

      const headers = {

        Authorization: `Bearer ${token}`,

      };


      console.log('Datos enviados a la API:', { newEmail, password });
      console.log('Token enviado en los encabezados:', headers);

      const response = await api.patch('/api/auth/change-email', { newEmail, password }, { headers });

      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const updateUsersSlice = createSlice({
  name: 'updateUsers',
  initialState: {
    loading: false, 
    error: null,   
    success: false,
    
  },
  reducers: {},
  extraReducers: builder => {
   
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false; 
      state.error = null;     
      state.success = true;   
    });
  
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false; 
      state.error = action.payload;  
      state.success = false;         
    });
   
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;   
      state.error = null;    
      state.success = false;  
    })

   
    builder
 .addCase(changePassword.pending, (state) => {
    state.loading = true;  
    state.error = null;    
    state.success = false;  
  })
 .addCase(changePassword.fulfilled, (state, action) => {
    state.loading = false; 
    state.error = null;     
    state.success = true;  
  })
 .addCase(changePassword.rejected, (state, action) => {
    state.loading = false;        
    state.error = action.payload;  
    state.success = false;        
  })



  builder
  .addCase(changeEmail.pending, (state) => {
    state.loading = true;
    state.error = null;
    state.success = false;
  })
  .addCase(changeEmail.fulfilled, (state) => {
    state.loading = false;
    state.error = null;
    state.success = true;
  })
  .addCase(changeEmail.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  });


  },
})


export default updateUsersSlice.reducer;