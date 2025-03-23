import { Platform } from 'react-native';

// Define a minimal storage interface that matches AsyncStorage
export interface StorageInterface {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}

// Create mock storage for SSR environment
const createMockStorage = (): StorageInterface => ({
    getItem: async () => null,
    setItem: async () => { },
    removeItem: async () => { },
});

// Function to get the appropriate storage implementation
const getStorage = (): StorageInterface => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') {
        // Return mock implementation for SSR
        return createMockStorage();
    }

    // In browser environment, we can safely import AsyncStorage
    try {
        // Dynamically import AsyncStorage
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        return AsyncStorage;
    } catch (error) {
        console.warn('AsyncStorage not available:', error);
        // Fallback to mock storage
        return createMockStorage();
    }
};

// Export the appropriate storage implementation
export const storage = getStorage();

export default storage; 