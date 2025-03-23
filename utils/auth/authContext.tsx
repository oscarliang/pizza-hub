import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import {
    isAuthenticated,
    getCurrentUser,
    loginWithEmail,
    registerWithEmail,
    logout,
    signInWithGoogle,
    signInWithApple,
    signInWithFacebook,
    requestPasswordReset,
    resetPassword,
    User
} from './authService';

// Define Auth Context types
interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<User>;
    register: (email: string, password: string, name: string, phone?: string) => Promise<User>;
    loginWithGoogle: () => Promise<User>;
    loginWithApple: () => Promise<User>;
    loginWithFacebook: () => Promise<User>;
    forgotPassword: (email: string) => Promise<any>;
    setNewPassword: (token: string, newPassword: string) => Promise<any>;
    signOut: () => Promise<void>;
    clearError: () => void;
}

// Props for the AuthProvider component
interface AuthProviderProps {
    children: ReactNode;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Check if the user is authenticated on initial load
    useEffect(() => {
        const loadUserData = async (): Promise<void> => {
            try {
                const authenticated = await isAuthenticated();

                if (authenticated) {
                    const userData = await getCurrentUser();
                    setUser(userData);
                }
            } catch (err) {
                console.error('Failed to load user data:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    // Register a new user
    const register = async (email: string, password: string, name: string, phone?: string): Promise<User> => {
        setLoading(true);
        setError(null);

        try {
            const userData = await registerWithEmail(email, password, name, phone || '');
            setUser(userData);
            return userData;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Login with email and password
    const login = async (email: string, password: string): Promise<User> => {
        setLoading(true);
        setError(null);

        try {
            const userData = await loginWithEmail(email, password);
            setUser(userData);
            return userData;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Login with Google
    const loginWithGoogleAuth = async (): Promise<User> => {
        setLoading(true);
        setError(null);

        try {
            const userData = await signInWithGoogle();
            setUser(userData);
            return userData;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Google login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Login with Apple
    const loginWithAppleAuth = async (): Promise<User> => {
        setLoading(true);
        setError(null);

        try {
            const userData = await signInWithApple();
            setUser(userData);
            return userData;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Apple login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Login with Facebook
    const loginWithFacebookAuth = async (): Promise<User> => {
        setLoading(true);
        setError(null);

        try {
            const userData = await signInWithFacebook();
            setUser(userData);
            return userData;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Facebook login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Send password reset email
    const forgotPassword = async (email: string): Promise<any> => {
        setLoading(true);
        setError(null);

        try {
            const result = await requestPasswordReset(email);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Password reset request failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Reset password with token
    const setNewPassword = async (token: string, newPassword: string): Promise<any> => {
        setLoading(true);
        setError(null);

        try {
            const result = await resetPassword(token, newPassword);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Password reset failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const signOut = async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            await logout();
            setUser(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Logout failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Clear any authentication errors
    const clearError = (): void => {
        setError(null);
    };

    // The context value that will be supplied to any descendants of this provider
    const contextValue: AuthContextType = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        loginWithGoogle: loginWithGoogleAuth,
        loginWithApple: loginWithAppleAuth,
        loginWithFacebook: loginWithFacebookAuth,
        forgotPassword,
        setNewPassword,
        signOut,
        clearError
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}; 