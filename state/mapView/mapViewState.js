import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  landmarks: true,
  roads: true,
  radius: true,
};

const svgVisibilitySlice = createSlice({
  name: 'svgVisibility',
  initialState,
  reducers: {
    toggleVisibility: (state, action) => {
        console.log("Action:", action);
      const { element } = action.payload;
      state[element] = !state[element];
    },
  },
});

export const { toggleVisibility } = svgVisibilitySlice.actions;
export default svgVisibilitySlice.reducer;