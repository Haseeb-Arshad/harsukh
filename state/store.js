import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import languageReducer from './language/languageState';
import svgVisibilityReducer from './mapView/mapViewState';
import favoriteApartmentsReducer from './apartment/favApartment';
import elevationReducer from './Elevation/ElevationState';
import floorMenuReducer from './floor/FloorMenu'; // Corrected import name
import amenitiesReducer from './Amenity/amenityState';

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
    elevation: elevationReducer,
    floorMenu: floorMenuReducer, 
    amenities: amenitiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);