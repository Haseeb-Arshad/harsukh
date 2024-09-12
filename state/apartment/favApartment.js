import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteApartments: [
   
  ]
};

const favoriteApartmentsSlice = createSlice({
  name: 'favoriteApartments',
  initialState,
  reducers: {
    addFavoriteApartment: (state, action) => {
      const newFavorite = action.payload;
      const existingIndex = state.favoriteApartments.findIndex(apt => apt.Apartmentno === newFavorite.Apartmentno);
      if (existingIndex === -1) {
        state.favoriteApartments.push(newFavorite);
      } else {
        state.favoriteApartments[existingIndex] = newFavorite;
      }
    },
    removeFavoriteApartment: (state, action) => {
      state.favoriteApartments = state.favoriteApartments.filter(apt => apt.Apartmentno !== action.payload);
    },
  },
});

export const { addFavoriteApartment, removeFavoriteApartment } = favoriteApartmentsSlice.actions;
export default favoriteApartmentsSlice.reducer;