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


export const fetchRoomById = createAsyncThunk(
    'rooms/fetchRoomById',
    async (roomId) => {
        try {
            const response = await axios.get(`/api/rooms/${roomId}`);

            return response.data;

        } catch (error) {
            throw error;
        }
    }
);

export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async ({ buildingId, roomData }) => {
        try {
            const response = await axios.post(`/api/rooms/${buildingId}/types`, roomData);

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
    selectedBuildingId: '' 
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setSelectedBuildingId(state, action) {
            state.selectedBuildingId = action.payload; 
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
            })
          
            builder
            .addCase(createRoom.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.loading = 'idle';
             
                state.rooms.push(action.payload);
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            })
         

            builder
    .addCase(fetchRoomById.pending, (state) => {
        state.loading = 'loading';
    })
    .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.rooms = [action.payload];
    })
    .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
    });
    }
});

export const { setSelectedBuildingId } = roomsSlice.actions; 

export default roomsSlice.reducer;