import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRoomsByBuilding = createAsyncThunk('rooms/fetchRoomsByBuilding', async (buildingId) => {
    console.log("Fetching rooms for building ID:", buildingId);
    const response = await axios.get(`/api/rooms/findByBuilding/${buildingId}`);
    return response.data; 
});

export const updateRoom = createAsyncThunk(
    'rooms/updateRoom',
    async ({ buildingId, roomId, updateRoomData }) => {
        try {
            const response = await axios.patch(`/api/rooms/${buildingId}/types/${roomId}`, updateRoomData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    rooms: [],
    loading: false,
    error: null,
    selectedBuildingId: '' // Asegúrate de que selectedBuildingId esté inicializado aquí
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setSelectedBuildingId(state, action) {
            state.selectedBuildingId = action.payload; // Actualiza selectedBuildingId con el valor proporcionado
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomsByBuilding.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchRoomsByBuilding.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.rooms = action.payload;
            })
            .addCase(fetchRoomsByBuilding.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error;
            })
            .addCase(updateRoom.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.rooms = state.rooms.map((room) =>
                    room._id === action.payload._id ? action.payload : room
                );
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            });
    }
});

export const { setSelectedBuildingId } = roomsSlice.actions; // Exporta la acción setSelectedBuildingId

export default roomsSlice.reducer;