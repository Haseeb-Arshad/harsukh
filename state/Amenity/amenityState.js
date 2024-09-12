import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  amenities: [
    "Studio",
    "1 Bed Apartments",
    "2 Bed Apartments",
    "3 Bed Apartments",
    "Pent Houses",
  ],
  selectedAmenities: [],
};

const amenitiesSlice = createSlice({
  name: 'amenities',
  initialState,
  reducers: {
    toggleAmenity: (state, action) => {
      const amenity = action.payload;
      if (state.selectedAmenities.includes(amenity)) {
        state.selectedAmenities = state.selectedAmenities.filter(a => a !== amenity);
      } else {
        state.selectedAmenities.push(amenity);
      }
    },
    resetAmenities: (state) => {
      state.selectedAmenities = [];
    },
  },
});

export const { toggleAmenity, resetAmenities } = amenitiesSlice.actions;

export default amenitiesSlice.reducer;