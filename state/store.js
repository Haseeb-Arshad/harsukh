// store.js
import { configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// Uncomment the following line if using React Native
// import AsyncStorage from '@react-native-async-storage/async-storage';

import languageReducer from './language/languageState';
import svgVisibilityReducer from './mapView/mapViewState';
import favoriteApartmentsReducer from './apartment/favApartment';

const persistConfig = {
  key: 'root',
  storage, // Use AsyncStorage if in React Native
  whitelist: ['favoriteApartments'], // only favoriteApartments will be persisted
};

const persistedFavoriteApartmentsReducer = persistReducer(persistConfig, favoriteApartmentsReducer);

export const store = configureStore({
  reducer: {
    language: languageReducer,
    svgVisibility: svgVisibilityReducer,
    favoriteApartments: persistedFavoriteApartmentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);