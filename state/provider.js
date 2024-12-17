// app/providers.js
'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
<<<<<<< HEAD
import { store, persistor } from './store';
import { fetchUnits } from './units/unitsSlice';
import { useEffect } from 'react';

export function Providers({ children }) {

  useEffect(() => {
    store.dispatch(fetchUnits());
    
  }, []);

=======
import { store, persistor } from './store'; // Adjust the path as needed

const Providers = ({ children }) => {
  // Initialize the store using the wrapper's useWrappedStore hook
  // const { store } = wrapper.useWrappedStore({});
  // const [persistor, setPersistor] = useState(null);

  // useEffect(() => {
  //   if (store.__persistor) {
  //     setPersistor(store.__persistor);
  //   }
  // }, [store]);

>>>>>>> 2d3aa3649fea816d338b0c16555f5299b70efab5
  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
};

export default Providers;
