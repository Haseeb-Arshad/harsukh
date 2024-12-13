'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { fetchUnits } from './units/unitsSlice';
import { useEffect } from 'react';

export function Providers({ children }) {

  useEffect(() => {
    store.dispatch(fetchUnits());
    
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}