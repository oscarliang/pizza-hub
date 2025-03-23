// Define environment variables needed for the app
// This is especially important for web builds

// We need to use a safer approach for setting environment variables in the browser
// as direct assignment to process.env can cause errors

// Helper function to safely set environment variables
const safeSetEnv = (key: string, value: string) => {
    if (typeof process !== 'undefined' && process.env) {
        try {
            // Use this approach instead of direct assignment
            if (typeof process.env[key] === 'undefined') {
                // @ts-ignore - We know this is needed for the environment setup
                process.env[key] = value;
            }
        } catch (e) {
            console.warn(`Failed to set environment variable ${key}:`, e);
        }
    }
};

// Ensure EXPO_OS is defined
safeSetEnv('EXPO_OS', 'web');

// Ensure EXPO_ROUTER_APP_ROOT is defined
safeSetEnv('EXPO_ROUTER_APP_ROOT', 'app');

// Ensure EXPO_ROUTER_ABS_APP_ROOT is defined
if (typeof process !== 'undefined' && process.env) {
    if (typeof process.cwd === 'function') {
        safeSetEnv('EXPO_ROUTER_ABS_APP_ROOT', `${process.cwd()}/app`);
    } else {
        // Fallback for web environments where process.cwd may not be available
        safeSetEnv('EXPO_ROUTER_ABS_APP_ROOT', '/app');
    }
}

export default {
    EXPO_OS: process.env.EXPO_OS,
    EXPO_ROUTER_APP_ROOT: process.env.EXPO_ROUTER_APP_ROOT,
    EXPO_ROUTER_ABS_APP_ROOT: process.env.EXPO_ROUTER_ABS_APP_ROOT,
}; 