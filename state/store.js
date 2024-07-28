// store.js
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/languageState';
import svgVisibilityReducer from './mapView/mapViewState';
import favoriteApartmentsReducer from './apartment/favApartment';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    svgVisibility: svgVisibilityReducer,
    favoriteApartments: favoriteApartmentsReducer,
  },
});