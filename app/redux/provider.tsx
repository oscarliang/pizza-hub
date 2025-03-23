import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

interface ReduxProviderProps {
    children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
    // Check if we're on the server or if persistor is undefined
    const isServer = typeof window === 'undefined';
    const hasPersistor = !isServer && persistor !== undefined;

    return (
        <Provider store={store}>
            {hasPersistor ? (
                // If persistor is available, use PersistGate with non-null assertion
                <PersistGate loading={null} persistor={persistor!}>
                    {children}
                </PersistGate>
            ) : (
                // Otherwise render children directly
                children
            )}
        </Provider>
    );
}

export default ReduxProvider; 