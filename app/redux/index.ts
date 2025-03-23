// Redux store exports
import { store, persistor } from './store';
export { store, persistor };
export type { RootState, AppDispatch } from './store';

// Redux hooks exports
export { useAppDispatch, useAppSelector } from './hooks/reduxHooks';

// Auth slice exports
export {
    loginUser,
    logoutUser,
    clearError
} from './slices/authSlice';

// User slice exports
export {
    fetchUserProfile,
    updateNotificationSettings,
    setNotificationSettings,
    clearUserError
} from './slices/userSlice';

// Cart slice exports
export {
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    fetchCart
} from './slices/cartSlice';

// Order slice exports
export {
    fetchOrders,
    fetchOrderById,
    placeOrder,
    updateOrderItems,
    cancelOrder,
    setActiveOrder,
    clearActiveOrder,
    addItemToOrder,
    removeItemFromOrder,
    updateItemQuantity as updateOrderItemQuantity
} from './slices/orderSlice';

export type {
    Order,
    OrderItem,
    OrderStatus,
    TrackingInfo,
    Location
} from './slices/orderSlice';

// Adding default export to fix the warning
const reduxStore = { store, persistor };
export default reduxStore; 