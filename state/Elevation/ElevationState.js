import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isElevationClicked: false,
  elevationArray: [],
};

export const elevationSlice = createSlice({
  name: 'elevation',
  initialState,
  reducers: {
    toggleElevation: (state) => {
      state.isElevationClicked = !state.isElevationClicked;
    },
    setElevationArray: (state, action) => {
      state.elevationArray = action.payload;
    },
  },
});

export const { toggleElevation, setElevationArray } = elevationSlice.actions;

export default elevationSlice.reducer;