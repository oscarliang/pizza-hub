import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, Persistor } from 'redux-persist';
import storage from '@/utils/storage';

// Import reducers
import authReducer, { AuthState } from './slices/authSlice';
import userReducer, { UserState } from './slices/userSlice';
import cartReducer, { CartState } from './slices/cartSlice';
import orderReducer, { OrderState } from './slices/orderSlice';

// Define RootState type
export interface RootState {
    auth: AuthState;
    user: UserState;
    cart: CartState;
    orders: OrderState;
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer
});

// Check if window is defined (client-side)
const isClient = typeof window !== 'undefined';

// Create store with appropriate reducer
let finalReducer;

if (isClient) {
    // Configure persist for client
    const persistConfig = {
        key: 'root',
        storage, // Use our custom storage implementation
        whitelist: ['auth', 'user', 'cart', 'orders'], // Only persist these reducers
        writeFailHandler: (err: Error) => {
            console.warn('Error persisting state', err);
        }
    };

    finalReducer = persistReducer(persistConfig, rootReducer);
} else {
    finalReducer = rootReducer;
}

// Create store
export const store = configureStore({
    reducer: finalReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create persistor only on client
export let persistor: Persistor | undefined = undefined;

if (isClient) {
    persistor = persistStore(store);
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

// Export a default object containing both store and persistor
export default { store, persistor }; 