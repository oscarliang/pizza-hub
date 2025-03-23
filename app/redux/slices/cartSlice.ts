import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types for cart items
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    options?: {
        [key: string]: string | number | boolean;
    };
}

// Define the cart state structure
export interface CartState {
    items: CartItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    isLoading: boolean;
    error: string | null;
}

// Helper function to calculate cart totals
const calculateCartTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const deliveryFee = subtotal > 0 ? 3.99 : 0; // $3.99 delivery fee if cart not empty
    const total = subtotal + tax + deliveryFee;

    return { subtotal, tax, deliveryFee, total };
};

// Define initial state
const initialState: CartState = {
    items: [],
    subtotal: 0,
    tax: 0,
    deliveryFee: 0,
    total: 0,
    isLoading: false,
    error: null,
};

// Define async thunks for cart operations
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            // This would be replaced with actual API call to your backend
            // Simulating API call with a timeout for now
            return await new Promise<CartItem[]>((resolve) => {
                setTimeout(() => {
                    resolve([]);
                }, 500);
            });
        } catch (error) {
            return rejectWithValue('Failed to fetch cart.');
        }
    }
);

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id &&
                    JSON.stringify(item.options) === JSON.stringify(action.payload.options)
            );

            if (existingItemIndex >= 0) {
                // Increase quantity if item already exists with same options
                state.items[existingItemIndex].quantity += action.payload.quantity;
            } else {
                // Add new item
                state.items.push(action.payload);
            }

            // Recalculate totals
            const totals = calculateCartTotals(state.items);
            state.subtotal = totals.subtotal;
            state.tax = totals.tax;
            state.deliveryFee = totals.deliveryFee;
            state.total = totals.total;
        },
        removeItem: (state, action: PayloadAction<{ id: string; options?: object }>) => {
            state.items = state.items.filter(
                item => !(item.id === action.payload.id &&
                    JSON.stringify(item.options) === JSON.stringify(action.payload.options))
            );

            // Recalculate totals
            const totals = calculateCartTotals(state.items);
            state.subtotal = totals.subtotal;
            state.tax = totals.tax;
            state.deliveryFee = totals.deliveryFee;
            state.total = totals.total;
        },
        updateItemQuantity: (state, action: PayloadAction<{ id: string; options?: object; quantity: number }>) => {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id &&
                    JSON.stringify(item.options) === JSON.stringify(action.payload.options)
            );

            if (existingItemIndex >= 0) {
                // Update quantity
                state.items[existingItemIndex].quantity = action.payload.quantity;

                // If quantity is 0, remove the item
                if (action.payload.quantity <= 0) {
                    state.items.splice(existingItemIndex, 1);
                }
            }

            // Recalculate totals
            const totals = calculateCartTotals(state.items);
            state.subtotal = totals.subtotal;
            state.tax = totals.tax;
            state.deliveryFee = totals.deliveryFee;
            state.total = totals.total;
        },
        clearCart: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
                state.items = action.payload;
                const totals = calculateCartTotals(action.payload);
                state.subtotal = totals.subtotal;
                state.tax = totals.tax;
                state.deliveryFee = totals.deliveryFee;
                state.total = totals.total;
                state.isLoading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An unknown error occurred';
            });
    },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 