import { createSlice } from '@reduxjs/toolkit';

const fullscreenSlice = createSlice({
  name: 'fullscreen',
  initialState: {
    isFullScreen: false,
  },
  reducers: {
    toggleFullScreen: (state) => {
      state.isFullScreen = !state.isFullScreen;
    },
    setFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
    },
  },
});

export const { toggleFullScreen, setFullScreen } = fullscreenSlice.actions;
export default fullscreenSlice.reducer;