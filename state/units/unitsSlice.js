// src/state/units/unitsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  units: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch units from the backend API
export const fetchUnits = createAsyncThunk('units/fetchUnits', async () => {
  const response = await axios.get('https://almaymaar.rems.pk/api/units');
  // Assuming the API returns data in the format { units: [...] }
   
  return response.data.units;
});

// Create the slice
const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    // You can add reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.units = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default unitsSlice.reducer;
