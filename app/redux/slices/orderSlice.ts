import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

// Define types for locations
export interface Location {
    latitude: number;
    longitude: number;
}

// Define order status types
export type OrderStatus = 'pending' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';

// Define tracking information type
export interface TrackingInfo {
    status: OrderStatus;
    currentLocation?: Location;
    estimatedDeliveryTime?: string;
    deliveryPersonName?: string;
    deliveryPersonPhone?: string;
    deliveryPersonPhoto?: string;
    updatedAt: string;
}

// Define order item type (extends CartItem)
export interface OrderItem extends CartItem {
    specialInstructions?: string;
}

// Define order type
export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    tip?: number;
    total: number;
    status: OrderStatus;
    createdAt: string;
    estimatedDelivery: string;
    deliveryAddress: {
        id: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    paymentMethod: {
        id: string;
        type: string;
        lastFour?: string;
    };
    tracking: TrackingInfo;
}

export interface OrderState {
    orders: Order[];
    activeOrderId: string | null;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: OrderState = {
    orders: [],
    activeOrderId: null,
    isLoading: false,
    error: null,
};

// Async thunks for order operations
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            // This would be replaced with an actual API call
            return await new Promise<Order[]>((resolve) => {
                setTimeout(() => {
                    resolve([
                        {
                            id: '1',
                            orderNumber: '#ORD-4521',
                            userId: '1',
                            items: [
                                {
                                    id: '1',
                                    name: 'Pepperoni Pizza (Large)',
                                    quantity: 1,
                                    price: 18.99,
                                    image: '/assets/images/pepperoni-pizza.jpg',
                                },
                                {
                                    id: '2',
                                    name: 'Garlic Bread',
                                    quantity: 2,
                                    price: 5.99,
                                    image: '/assets/images/garlic-bread.jpg',
                                },
                                {
                                    id: '3',
                                    name: 'Coca Cola (2L)',
                                    quantity: 1,
                                    price: 3.99,
                                    image: '/assets/images/coca-cola.jpg',
                                },
                            ],
                            subtotal: 34.96,
                            tax: 2.80,
                            deliveryFee: 3.99,
                            tip: 5.00,
                            total: 46.75,
                            status: 'out-for-delivery',
                            createdAt: new Date().toISOString(),
                            estimatedDelivery: '15-25 mins',
                            deliveryAddress: {
                                id: '1',
                                street: '123 Main St',
                                city: 'New York',
                                state: 'NY',
                                zipCode: '10001',
                            },
                            paymentMethod: {
                                id: '1',
                                type: 'card',
                                lastFour: '4242',
                            },
                            tracking: {
                                status: 'out-for-delivery',
                                currentLocation: {
                                    latitude: 40.7128,
                                    longitude: -74.0060,
                                },
                                estimatedDeliveryTime: '15-25 mins',
                                deliveryPersonName: 'John Doe',
                                deliveryPersonPhone: '+1 (555) 123-4567',
                                deliveryPersonPhoto: '/assets/images/delivery-person.jpg',
                                updatedAt: new Date().toISOString(),
                            },
                        },
                    ]);
                }, 500);
            });
        } catch (error) {
            return rejectWithValue('Failed to fetch orders');
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (orderId: string, { rejectWithValue }) => {
        try {
            // This would be replaced with an actual API call
            return await new Promise<Order>((resolve) => {
                setTimeout(() => {
                    resolve({
                        id: orderId,
                        orderNumber: '#ORD-4521',
                        userId: '1',
                        items: [
                            {
                                id: '1',
                                name: 'Pepperoni Pizza (Large)',
                                quantity: 1,
                                price: 18.99,
                                image: '/assets/images/pepperoni-pizza.jpg',
                            },
                            {
                                id: '2',
                                name: 'Garlic Bread',
                                quantity: 2,
                                price: 5.99,
                                image: '/assets/images/garlic-bread.jpg',
                            },
                            {
                                id: '3',
                                name: 'Coca Cola (2L)',
                                quantity: 1,
                                price: 3.99,
                                image: '/assets/images/coca-cola.jpg',
                            },
                        ],
                        subtotal: 34.96,
                        tax: 2.80,
                        deliveryFee: 3.99,
                        tip: 5.00,
                        total: 46.75,
                        status: 'out-for-delivery',
                        createdAt: new Date().toISOString(),
                        estimatedDelivery: '15-25 mins',
                        deliveryAddress: {
                            id: '1',
                            street: '123 Main St',
                            city: 'New York',
                            state: 'NY',
                            zipCode: '10001',
                        },
                        paymentMethod: {
                            id: '1',
                            type: 'card',
                            lastFour: '4242',
                        },
                        tracking: {
                            status: 'out-for-delivery',
                            currentLocation: {
                                latitude: 40.7128,
                                longitude: -74.0060,
                            },
                            estimatedDeliveryTime: '15-25 mins',
                            deliveryPersonName: 'John Doe',
                            deliveryPersonPhone: '+1 (555) 123-4567',
                            deliveryPersonPhoto: '/assets/images/delivery-person.jpg',
                            updatedAt: new Date().toISOString(),
                        },
                    });
                }, 500);
            });
        } catch (error) {
            return rejectWithValue(`Failed to fetch order with ID: ${orderId}`);
        }
    }
);

export const placeOrder = createAsyncThunk(
    'orders/placeOrder',
    async (orderData: Partial<Order>, { rejectWithValue }) => {
        try {
            // This would be replaced with an actual API call
            return await new Promise<Order>((resolve) => {
                setTimeout(() => {
                    const newOrder: Order = {
                        id: Math.random().toString(36).substring(2, 9),
                        orderNumber: `#ORD-${Math.floor(Math.random() * 9000) + 1000}`,
                        userId: '1',
                        items: orderData.items || [],
                        subtotal: orderData.subtotal || 0,
                        tax: orderData.tax || 0,
                        deliveryFee: orderData.deliveryFee || 0,
                        tip: orderData.tip || 0,
                        total: orderData.total || 0,
                        status: 'pending',
                        createdAt: new Date().toISOString(),
                        estimatedDelivery: '30-45 mins',
                        deliveryAddress: orderData.deliveryAddress || {
                            id: '1',
                            street: '123 Main St',
                            city: 'New York',
                            state: 'NY',
                            zipCode: '10001',
                        },
                        paymentMethod: orderData.paymentMethod || {
                            id: '1',
                            type: 'card',
                            lastFour: '4242',
                        },
                        tracking: {
                            status: 'pending',
                            updatedAt: new Date().toISOString(),
                        },
                    };
                    resolve(newOrder);
                }, 500);
            });
        } catch (error) {
            return rejectWithValue('Failed to place order');
        }
    }
);

export const updateOrderItems = createAsyncThunk(
    'orders/updateOrderItems',
    async ({ orderId, items }: { orderId: string; items: OrderItem[] }, { rejectWithValue }) => {
        try {
            // This would be replaced with an actual API call
            return await new Promise<{ orderId: string; items: OrderItem[] }>((resolve) => {
                setTimeout(() => {
                    resolve({ orderId, items });
                }, 500);
            });
        } catch (error) {
            return rejectWithValue('Failed to update order items');
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'orders/cancelOrder',
    async (orderId: string, { rejectWithValue }) => {
        try {
            // This would be replaced with an actual API call
            return await new Promise<string>((resolve) => {
                setTimeout(() => {
                    resolve(orderId);
                }, 500);
            });
        } catch (error) {
            return rejectWithValue('Failed to cancel order');
        }
    }
);

// Order slice
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setActiveOrder: (state, action: PayloadAction<string>) => {
            state.activeOrderId = action.payload;
        },
        clearActiveOrder: (state) => {
            state.activeOrderId = null;
        },
        addItemToOrder: (state, action: PayloadAction<{ orderId: string; item: OrderItem }>) => {
            const { orderId, item } = action.payload;
            const orderIndex = state.orders.findIndex(order => order.id === orderId);

            if (orderIndex !== -1) {
                const existingItemIndex = state.orders[orderIndex].items.findIndex(
                    orderItem => orderItem.id === item.id
                );

                if (existingItemIndex !== -1) {
                    // Update existing item quantity
                    state.orders[orderIndex].items[existingItemIndex].quantity += item.quantity;
                } else {
                    // Add new item
                    state.orders[orderIndex].items.push(item);
                }

                // Recalculate order totals
                const items = state.orders[orderIndex].items;
                const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const tax = subtotal * 0.08; // 8% tax
                const deliveryFee = state.orders[orderIndex].deliveryFee;
                const tip = state.orders[orderIndex].tip || 0;
                const total = subtotal + tax + deliveryFee + tip;

                state.orders[orderIndex].subtotal = subtotal;
                state.orders[orderIndex].tax = tax;
                state.orders[orderIndex].total = total;
            }
        },
        removeItemFromOrder: (state, action: PayloadAction<{ orderId: string; itemId: string }>) => {
            const { orderId, itemId } = action.payload;
            const orderIndex = state.orders.findIndex(order => order.id === orderId);

            if (orderIndex !== -1) {
                state.orders[orderIndex].items = state.orders[orderIndex].items.filter(
                    item => item.id !== itemId
                );

                // Recalculate order totals
                const items = state.orders[orderIndex].items;
                const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const tax = subtotal * 0.08; // 8% tax
                const deliveryFee = state.orders[orderIndex].deliveryFee;
                const tip = state.orders[orderIndex].tip || 0;
                const total = subtotal + tax + deliveryFee + tip;

                state.orders[orderIndex].subtotal = subtotal;
                state.orders[orderIndex].tax = tax;
                state.orders[orderIndex].total = total;
            }
        },
        updateItemQuantity: (state, action: PayloadAction<{
            orderId: string;
            itemId: string;
            quantity: number
        }>) => {
            const { orderId, itemId, quantity } = action.payload;
            const orderIndex = state.orders.findIndex(order => order.id === orderId);

            if (orderIndex !== -1) {
                const itemIndex = state.orders[orderIndex].items.findIndex(
                    item => item.id === itemId
                );

                if (itemIndex !== -1) {
                    if (quantity <= 0) {
                        // Remove item if quantity is 0 or less
                        state.orders[orderIndex].items = state.orders[orderIndex].items.filter(
                            item => item.id !== itemId
                        );
                    } else {
                        // Update quantity
                        state.orders[orderIndex].items[itemIndex].quantity = quantity;
                    }

                    // Recalculate order totals
                    const items = state.orders[orderIndex].items;
                    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    const tax = subtotal * 0.08; // 8% tax
                    const deliveryFee = state.orders[orderIndex].deliveryFee;
                    const tip = state.orders[orderIndex].tip || 0;
                    const total = subtotal + tax + deliveryFee + tip;

                    state.orders[orderIndex].subtotal = subtotal;
                    state.orders[orderIndex].tax = tax;
                    state.orders[orderIndex].total = total;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchOrders
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.orders = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An unknown error occurred';
            })

            // Handle fetchOrderById
            .addCase(fetchOrderById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
                const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = action.payload;
                } else {
                    state.orders.push(action.payload);
                }
                state.activeOrderId = action.payload.id;
                state.isLoading = false;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An unknown error occurred';
            })

            // Handle placeOrder
            .addCase(placeOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.orders.unshift(action.payload);
                state.activeOrderId = action.payload.id;
                state.isLoading = false;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An unknown error occurred';
            })

            // Handle updateOrderItems
            .addCase(updateOrderItems.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateOrderItems.fulfilled, (state, action: PayloadAction<{ orderId: string; items: OrderItem[] }>) => {
                const { orderId, items } = action.payload;
                const orderIndex = state.orders.findIndex(order => order.id === orderId);

                if (orderIndex !== -1) {
                    state.orders[orderIndex].items = items;

                    // Recalculate order totals
                    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    const tax = subtotal * 0.08; // 8% tax
                    const total = subtotal + tax + state.orders[orderIndex].deliveryFee + (state.orders[orderIndex].tip || 0);

                    state.orders[orderIndex].subtotal = subtotal;
                    state.orders[orderIndex].tax = tax;
                    state.orders[orderIndex].total = total;
                }

                state.isLoading = false;
            })
            .addCase(updateOrderItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An unknown error occurred';
            })

            // Handle cancelOrder
            .addCase(cancelOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action: PayloadAction<string>) => {
                const orderIndex = state.orders.findIndex(order => order.id === action.payload);

                if (orderIndex !== -1) {
                    state.orders[orderIndex].status = 'cancelled';
                    state.orders[orderIndex].tracking.status = 'cancelled';
                    state.orders[orderIndex].tracking.updatedAt = new Date().toISOString();
                }

                state.isLoading = false;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'An unknown error occurred';
            });
    },
});

export const {
    setActiveOrder,
    clearActiveOrder,
    addItemToOrder,
    removeItemFromOrder,
    updateItemQuantity
} = orderSlice.actions;

export default orderSlice.reducer; 