import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types for user state
export interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar: string | null;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
    favoriteOrders: FavoriteOrder[];
    notificationSettings: NotificationSettings;
    isLoading: boolean;
    error: string | null;
}

// Define types for user-related data
export interface Address {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    type: 'card' | 'paypal' | 'applepay';
    lastFour?: string;
    cardType?: string;
    isDefault: boolean;
}

export interface FavoriteOrder {
    id: string;
    name: string;
    items: string[];
}

export interface NotificationSettings {
    pushEnabled: boolean;
    emailEnabled: boolean;
    specialOffersEnabled: boolean;
}

// Define initial state
const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    avatar: null,
    addresses: [],
    paymentMethods: [],
    favoriteOrders: [],
    notificationSettings: {
        pushEnabled: true,
        emailEnabled: true,
        specialOffersEnabled: true,
    },
    isLoading: false,
    error: null,
};

// Define async thunks for user profile operations
export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            // This would be replaced with actual API call to your backend
            // Simulating API call with a timeout for now
            return await new Promise<UserState>((resolve) => {
                setTimeout(() => {
                    resolve({
                        id: '1',
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        avatar: null,
                        addresses: [],
                        paymentMethods: [],
                        favoriteOrders: [],
                        notificationSettings: {
                            pushEnabled: true,
                            emailEnabled: true,
                            specialOffersEnabled: true,
                        },
                        isLoading: false,
                        error: null,
                    });
                }, 500);
            });
        } catch (error) {
            return rejectWithValue('Failed to fetch user profile.');
        }
    }
);

export const updateNotificationSettings = createAsyncThunk(
    'user/updateNotificationSettings',
    async (settings: Partial<NotificationSettings>, { rejectWithValue }) => {
        try {
            // This would be replaced with actual API call to your backend
            // Simulating API call with a timeout for now
            return await new Promise<NotificationSettings>((resolve) => {
                setTimeout(() => {
                    resolve({
                        pushEnabled: settings.pushEnabled !== undefined ? settings.pushEnabled : true,
                        emailEnabled: settings.emailEnabled !== undefined ? settings.emailEnabled : true,
                        specialOffersEnabled: settings.specialOffersEnabled !== undefined
                            ? settings.specialOffersEnabled : true,
                    });
                }, 500);
            });
        } catch (error) {
            return rejectWithValue('Failed to update notification settings.');
        }
    }
);

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        setNotificationSettings: (state, action: PayloadAction<Partial<NotificationSettings>>) => {
            state.notificationSettings = {
                ...state.notificationSettings,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchUserProfile
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserState>) => {
                return {
                    ...action.payload,
                    isLoading: false,
                    error: null,
                };
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An unknown error occurred';
            })
            // Handle updateNotificationSettings
            .addCase(updateNotificationSettings.fulfilled, (state, action: PayloadAction<NotificationSettings>) => {
                state.notificationSettings = action.payload;
            });
    },
});

export const { clearUserError, setNotificationSettings } = userSlice.actions;
export default userSlice.reducer; 