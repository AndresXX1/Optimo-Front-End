import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'http://localhost:3000'; 


export const createBuilding = createAsyncThunk(
  'buildings/createBuilding',
  async (buildingData, { rejectWithValue }) => {
    try {
      
      const response = await axios.post(`${BASE_URL}/api/buildings/create`, buildingData);
     
      return response.data;
    } catch (error) {
      
      return rejectWithValue(error.response.data);

    }
  }
);



export const fetchBuildingById = createAsyncThunk(
    'buildings/fetchBuildingById',
    async (id, { rejectWithValue }) => {
      try {
     
        const response = await axios.get(`${BASE_URL}/api/buildings/${id}`);
       
        return response.data;

      } catch (error) {
      
        return rejectWithValue(error.response.data);
      }
    }
  );


const buildingsSlice = createSlice({
    name: 'buildings',
    initialState: {
      buildings: [], 
      building: null,
      loading: false,
      error: null,
    },
  reducers: {},
  extraReducers: (builder) => {
  
    builder.addCase(createBuilding.fulfilled, (state, action) => {
      state.buildings.push(action.payload); 
      state.loading = false; 
      state.error = null;
    });
   
    builder.addCase(createBuilding.pending, (state) => {
      state.loading = true; 
      state.error = null; 
    });
    
    builder.addCase(createBuilding.rejected, (state, action) => {
      state.loading = false; 
      state.error = action.payload; 
    })
   
      builder.addCase(fetchBuildingById.fulfilled, (state, action) => {
        state.building = action.payload; 
        state.loading = false; 
        state.error = null; 
      })
      builder.addCase(fetchBuildingById.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      builder.addCase(fetchBuildingById.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload; 
      });
  },
});


export const { } = buildingsSlice.actions;

export default buildingsSlice.reducer;
