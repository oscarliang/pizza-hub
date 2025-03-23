import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types for authentication state
export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

// Define initial state
const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    isLoading: false,
    error: null,
};

// Define async thunks for authentication operations
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            // This would be replaced with actual API call to your backend
            // Simulating API call with a timeout for now
            return await new Promise<{ token: string }>((resolve) => {
                setTimeout(() => {
                    resolve({ token: 'sample-jwt-token' });
                }, 500);
            });
        } catch (error) {
            return rejectWithValue('Login failed. Please check your credentials.');
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    // This would be replaced with actual API call to your backend if needed
    // For now, just simulating a successful logout
    return true;
});

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An unknown error occurred';
            })
            // Handle logout
            .addCase(logoutUser.fulfilled, (state) => {
                // Reset to initial state
                return initialState;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 