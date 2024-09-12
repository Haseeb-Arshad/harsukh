// gallerySlice.js
import { createSlice } from '@reduxjs/toolkit';

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    isGalleryPressed: false,
  },
  reducers: {
    setGalleryPressed: (state, action) => {
      state.isGalleryPressed = action.payload;
    },
  },
});

export const { setGalleryPressed } = gallerySlice.actions;
export default gallerySlice.reducer;
