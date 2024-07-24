// store.js
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/languageState';

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});
