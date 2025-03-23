import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { Platform } from 'react-native';

// Define type for user data
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    // Add other user properties as needed
}

// Define type for auth response
interface AuthResponse {
    user: User;
    token: string;
    message?: string; // Add message field for error handling
}

// Define type for password reset response
interface PasswordResetResponse {
    message: string;
    success: boolean;
}

// Mock API endpoints - replace with your actual API in production
const API_URL = 'https://api.yourdomain.com';

// Token storage key
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

/**
 * Register a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User full name
 * @param {string} phone - User phone number (optional)
 * @returns {Promise<User>} Promise with user data or error
 */
export const registerWithEmail = async (
    email: string,
    password: string,
    name: string,
    phone: string = ''
): Promise<User> => {
    try {
        // In a real app, this would be an API call to your backend
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                name,
                phone,
            }),
        });

        const data = await response.json() as AuthResponse;

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Store auth token and user data
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));

        return data.user;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<User>} Promise with user data or error
 */
export const loginWithEmail = async (
    email: string,
    password: string
): Promise<User> => {
    try {
        // In a real app, this would be an API call to your backend
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json() as AuthResponse;

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store auth token and user data
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));

        return data.user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise<PasswordResetResponse>} Promise with success message or error
 */
export const requestPasswordReset = async (
    email: string
): Promise<PasswordResetResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/request-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json() as PasswordResetResponse;

        if (!response.ok) {
            throw new Error(data.message || 'Password reset request failed');
        }

        return data;
    } catch (error) {
        console.error('Password reset request error:', error);
        throw error;
    }
};

/**
 * Reset password with token
 * @param {string} token - Reset token received via email
 * @param {string} newPassword - New password
 * @returns {Promise<PasswordResetResponse>} Promise with success message or error
 */
export const resetPassword = async (
    token: string,
    newPassword: string
): Promise<PasswordResetResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                newPassword,
            }),
        });

        const data = await response.json() as PasswordResetResponse;

        if (!response.ok) {
            throw new Error(data.message || 'Password reset failed');
        }

        return data;
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
};

/**
 * Sign in with Google
 * @returns {Promise<User>} Promise with user data or error
 */
export const signInWithGoogle = async (): Promise<User> => {
    try {
        // This is a simplified implementation
        // In a real app, you would use expo-auth-session with your own API keys
        const [request, response, promptAsync] = Google.useAuthRequest({
            clientId: 'YOUR_WEB_CLIENT_ID',  // Replace with actual client ID
            iosClientId: 'YOUR_IOS_CLIENT_ID',
            androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        });

        const result = await promptAsync();

        if (result.type !== 'success') {
            throw new Error('Google authentication failed');
        }

        // Send the token to your backend to validate and create a session
        const userInfo = await fetch(`${API_URL}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: result.params.access_token,
            }),
        });

        const userData = await userInfo.json() as AuthResponse;

        // Store auth token and user data
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, userData.token);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData.user));

        return userData.user;
    } catch (error) {
        console.error('Google sign-in error:', error);
        throw error;
    }
};

/**
 * Sign in with Apple
 * @returns {Promise<User>} Promise with user data or error
 */
export const signInWithApple = async (): Promise<User> => {
    // Only available on iOS and web
    if (Platform.OS !== 'ios' && Platform.OS !== 'web') {
        throw new Error('Apple sign-in is only available on iOS and web');
    }

    try {
        const redirectUri = makeRedirectUri({
            scheme: 'your-app-scheme'
        });

        const [request, response, promptAsync] = useAuthRequest(
            {
                clientId: 'YOUR_CLIENT_ID',
                scopes: ['email', 'fullName'],
                redirectUri
            },
            { authorizationEndpoint: 'https://appleid.apple.com/auth/authorize' }
        );

        const result = await promptAsync();

        if (result.type !== 'success') {
            throw new Error('Apple authentication failed');
        }

        // Send the token to your backend
        const userInfo = await fetch(`${API_URL}/auth/apple`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: result.params.id_token,
            }),
        });

        const userData = await userInfo.json() as AuthResponse;

        // Store auth token and user data
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, userData.token);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData.user));

        return userData.user;
    } catch (error) {
        console.error('Apple sign-in error:', error);
        throw error;
    }
};

/**
 * Sign in with Facebook
 * @returns {Promise<User>} Promise with user data or error
 */
export const signInWithFacebook = async (): Promise<User> => {
    try {
        const [request, response, promptAsync] = Facebook.useAuthRequest({
            clientId: 'YOUR_FACEBOOK_APP_ID',
        });

        const result = await promptAsync();

        if (result.type !== 'success') {
            throw new Error('Facebook authentication failed');
        }

        // Send the token to your backend
        const userInfo = await fetch(`${API_URL}/auth/facebook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: result.params.access_token,
            }),
        });

        const userData = await userInfo.json() as AuthResponse;

        // Store auth token and user data
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, userData.token);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData.user));

        return userData.user;
    } catch (error) {
        console.error('Facebook sign-in error:', error);
        throw error;
    }
};

/**
 * Logout current user
 * @returns {Promise<{ success: boolean }>} Promise with success or error
 */
export const logout = async (): Promise<{ success: boolean }> => {
    try {
        // Remove tokens and user data from storage
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        await AsyncStorage.removeItem(USER_DATA_KEY);

        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} Promise with boolean indicating if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        return !!token;
    } catch (error) {
        console.error('Auth check error:', error);
        return false;
    }
};

/**
 * Get current user data
 * @returns {Promise<User | null>} Promise with user data or null
 */
export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const userData = await AsyncStorage.getItem(USER_DATA_KEY);
        return userData ? JSON.parse(userData) as User : null;
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}; 