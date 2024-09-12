import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: [
    {id: "1",  language: 'en'},
  ],
};

const languageSlice = createSlice({
  name: 'languageState',
  initialState,
  reducers: {
    modifyLanguage: (state, action) => {
      const { language } = action.payload;
      const languageState = state.lang.find(site => site.id === '1');
      if (languageState) {
        languageState.language = language;
      }
    },
  }
});

export const { modifyLanguage } = languageSlice.actions;
export default languageSlice.reducer;
