// src/state/store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import languageReducer from './language/languageState';
import svgVisibilityReducer from './mapView/mapViewState';
import favoriteApartmentsReducer from './apartment/favApartment';
import elevation from './Elevation/ElevationState';
import floorMenuReducer from './floor/FloorMenu'; // Corrected import name
import amenitiesReducer from './Amenity/amenityState';
import GalleryReducer from './gallery/GalleryState';
import fullscreenReducer from './fullScreen/fullScreen';
import blogReducer from './blog/blogSlice';
import newsRoomReducer from './newsroom/newsroomSlice';
import unitsReducer from './units/unitsSlice'; // Import the units reducer

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favoriteApartments'],
};

const persistedFavoriteApartmentsReducer = persistReducer(persistConfig, favoriteApartmentsReducer);

export const store = configureStore({
  reducer: {
    language: languageReducer,
    svgVisibility: svgVisibilityReducer,
    favoriteApartments: persistedFavoriteApartmentsReducer,
    elevation: elevation,
    floorMenu: floorMenuReducer, 
    amenities: amenitiesReducer,
    gallery: GalleryReducer,
    fullscreen: fullscreenReducer,
    blogs: blogReducer,
    news: newsRoomReducer,
    units: unitsReducer, // Add the units reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
