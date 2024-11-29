// state/apartment/apartmentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import apartmentData from '@/app/component/data/floorData';

const initialState = {
  apartments: apartmentData, // Object with floor names as keys and arrays of apartments as values
};

const apartmentSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    updateApartmentStatus: (state, action) => {
      const { floor, Apartmentno, status } = action.payload;
      const apartment = state.apartments[floor]?.find(apt => apt.Apartmentno === Apartmentno);
      if (apartment) {
        apartment.status = status;
      }
    },
    updateApartmentDetails: (state, action) => {
      const { floor, Apartmentno, updates } = action.payload;
      const apartment = state.apartments[floor]?.find(apt => apt.Apartmentno === Apartmentno);
      if (apartment) {
        Object.assign(apartment, updates);
      }
    },
    toggleBookingStatus: (state, action) => {
      const { floor, Apartmentno } = action.payload;
      const apartment = state.apartments[floor]?.find(apt => apt.Apartmentno === Apartmentno);
      if (apartment) {
        apartment.status = apartment.status === 'Booked' ? 'Active' : 'Booked';
      }
    },
    // Additional reducers can be added here
  },
});

export const { updateApartmentStatus, updateApartmentDetails, toggleBookingStatus } = apartmentSlice.actions;
export default apartmentSlice.reducer;
