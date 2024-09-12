import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFloorClicked: false,
};

export const floorMenuSlice = createSlice({
  name: 'floorMenu',
  initialState,
  reducers: {
    toggleFloorMenu: (state) => {
      state.isFloorClicked = !state.isFloorClicked;
    },
    setFloorMenuOpen: (state, action) => {
      state.isFloorClicked = action.payload;
    },
  },
});

export const { toggleFloorMenu, setFloorMenuOpen } = floorMenuSlice.actions;

export default floorMenuSlice.reducer;