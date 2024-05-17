import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define la URL base para las solicitudes a la API
const BASE_URL = 'http://localhost:3000'; // Reemplaza esto con la URL de tu API

// Define la acción asincrónica para crear un nuevo edificio
export const createBuilding = createAsyncThunk(
  'buildings/createBuilding',
  async (buildingData, { rejectWithValue }) => {
    try {
      // Realiza la solicitud POST para crear un nuevo edificio
      const response = await axios.post(`${BASE_URL}/api/buildings/create`, buildingData);
      // Retorna los datos del nuevo edificio creado
      return response.data;
    } catch (error) {
      // Si ocurre un error, retorna el mensaje de error
      return rejectWithValue(error.response.data);
    }
  }
);

// action para traer lo datos dew un edificio

export const fetchBuildingById = createAsyncThunk(
    'buildings/fetchBuildingById',
    async (id, { rejectWithValue }) => {
      try {
        // Realiza la solicitud GET para obtener los datos de un edificio
        const response = await axios.get(`${BASE_URL}/api/buildings/${id}`);
        // Retorna los datos del edificio
        return response.data;
      } catch (error) {
        // Si ocurre un error, retorna el mensaje de error
        return rejectWithValue(error.response.data);
      }
    }
  );

// Define el slice para manejar el estado de los edificios
const buildingsSlice = createSlice({
    name: 'buildings',
    initialState: {
      buildings: [], // Array para almacenar los edificios
      building: null, // Objeto para almacenar el edificio seleccionado
      loading: false, // Estado de carga para indicar si se está realizando una solicitud
      error: null, // Para almacenar errores en caso de que ocurran
    },
  reducers: {},
  extraReducers: (builder) => {
    // Agrega un caso para la acción de éxito de la solicitud para crear un nuevo edificio
    builder.addCase(createBuilding.fulfilled, (state, action) => {
      state.buildings.push(action.payload); // Agrega el nuevo edificio al estado
      state.loading = false; // Indica que la solicitud ha sido exitosa
      state.error = null; // Limpiar cualquier error previo
    });
    // Agrega un caso para la acción de carga de la solicitud para crear un nuevo edificio
    builder.addCase(createBuilding.pending, (state) => {
      state.loading = true; // Indicar que se está realizando una solicitud
      state.error = null; // Limpiar cualquier error previo
    });
    // Agrega un caso para la acción de error de la solicitud para crear un nuevo edificio
    builder.addCase(createBuilding.rejected, (state, action) => {
      state.loading = false; // Indicar que la solicitud ha fallado
      state.error = action.payload; // Almacenar el mensaje de error
    })
      // Casos para la acción fetchBuildingById
      builder.addCase(fetchBuildingById.fulfilled, (state, action) => {
        state.building = action.payload; // Almacena los datos del edificio en el estado
        state.loading = false; // Indica que la solicitud ha sido exitosa
        state.error = null; // Limpiar cualquier error previo
      })
      builder.addCase(fetchBuildingById.pending, (state) => {
        state.loading = true; // Indicar que se está realizando una solicitud
        state.error = null; // Limpiar cualquier error previo
      })
      builder.addCase(fetchBuildingById.rejected, (state, action) => {
        state.loading = false; // Indicar que la solicitud ha fallado
        state.error = action.payload; // Almacenar el mensaje de error
      });
  },
});

// Exporta las acciones y el reducer generado por createSlice
export const { } = buildingsSlice.actions;
export default buildingsSlice.reducer;