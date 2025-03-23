import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector, fetchOrders, Order } from '@/app/redux';

// Legacy interface and sample data kept for reference
// interface Order {
//     id: string;
//     orderNumber: string;
//     date: string;
//     status: 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
//     items: string[];
//     total: string;
//     estimatedDelivery: string;
// }

// const orders: Order[] = [
//     ...
// ];

export default function OrdersScreen() {
    const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing');
    const dispatch = useAppDispatch();
    const { orders, isLoading, error } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const ongoingOrders = orders.filter(order =>
        order.status === 'preparing' || order.status === 'out-for-delivery' || order.status === 'pending'
    );

    const orderHistory = orders.filter(order =>
        order.status === 'delivered' || order.status === 'cancelled'
    );

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return <Ionicons name="receipt-outline" size={24} color="#9c27b0" />;
            case 'preparing':
                return <Ionicons name="restaurant" size={24} color="#ff9800" />;
            case 'out-for-delivery':
                return <MaterialIcons name="delivery-dining" size={24} color="#2196f3" />;
            case 'delivered':
                return <Ionicons name="checkmark-circle" size={24} color="#4caf50" />;
            case 'cancelled':
                return <Ionicons name="close-circle" size={24} color="#f44336" />;
        }
    };

    const getStatusText = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'preparing':
                return 'Preparing';
            case 'out-for-delivery':
                return 'Out for delivery';
            case 'delivered':
                return 'Delivered';
            case 'cancelled':
                return 'Cancelled';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Format the time
        const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const timeStr = date.toLocaleTimeString('en-US', timeOptions);

        // Check if it's today, yesterday, or earlier
        if (date.toDateString() === today.toDateString()) {
            return `Today, ${timeStr}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday, ${timeStr}`;
        } else {
            const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
            return `${date.toLocaleDateString('en-US', dateOptions)}, ${timeStr}`;
        }
    };

    const navigateToTrackOrder = (orderId: string) => {
        router.push(`/track-order?orderId=${orderId}`);
    };

    const navigateToMenu = () => {
        router.push('/menu');
    };

    const formatItemsToDisplay = (order: Order) => {
        return order.items.map(item => `${item.quantity}x ${item.name}`);
    };

    const renderOrderItem = ({ item }: { item: Order }) => (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigateToTrackOrder(item.id)}
        >
            <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                    <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                    <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
                </View>
                <View style={styles.statusContainer}>
                    {getStatusIcon(item.status)}
                    <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                </View>
            </View>

            <View style={styles.orderContent}>
                {formatItemsToDisplay(item).map((itemText, index) => (
                    <Text key={index} style={styles.itemText}>{itemText}</Text>
                ))}
            </View>

            <View style={styles.orderFooter}>
                <View>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${item.total.toFixed(2)}</Text>
                </View>
                {(item.status === 'out-for-delivery' || item.status === 'pending' || item.status === 'preparing') && (
                    <View style={styles.deliveryInfo}>
                        <MaterialIcons name="access-time" size={16} color="#666" />
                        <Text style={styles.deliveryTime}>{item.estimatedDelivery}</Text>
                    </View>
                )}
                {(item.status === 'out-for-delivery' || item.status === 'preparing' || item.status === 'pending') && (
                    <TouchableOpacity
                        style={styles.trackButton}
                        onPress={() => navigateToTrackOrder(item.id)}
                    >
                        <Text style={styles.trackButtonText}>Track Order</Text>
                    </TouchableOpacity>
                )}
                {item.status === 'delivered' && (
                    <TouchableOpacity style={styles.reorderButton}>
                        <Text style={styles.reorderButtonText}>Reorder</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Orders</Text>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
                    onPress={() => setActiveTab('ongoing')}
                >
                    <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>
                        Ongoing
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
                        History
                    </Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="hourglass-empty" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>Loading orders...</Text>
                </View>
            ) : error ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="alert-circle-outline" size={64} color="#f44336" />
                    <Text style={styles.emptyText}>Error loading orders</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(fetchOrders())}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : ((activeTab === 'ongoing' && ongoingOrders.length === 0) ||
                (activeTab === 'history' && orderHistory.length === 0)) ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="receipt-outline" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>
                        {activeTab === 'ongoing'
                            ? 'No ongoing orders'
                            : 'No order history'}
                    </Text>
                    <TouchableOpacity style={styles.orderNowButton} onPress={navigateToMenu}>
                        <Text style={styles.orderNowButtonText}>Order Now</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={activeTab === 'ongoing' ? ongoingOrders : orderHistory}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.orderList}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.light.tint,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    activeTabText: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 16,
        marginBottom: 24,
    },
    orderNowButton: {
        backgroundColor: Colors.light.tint,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    orderNowButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    orderList: {
        padding: 16,
    },
    orderItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    orderInfo: {
        flex: 1,
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 6,
    },
    orderContent: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
        marginBottom: 12,
    },
    itemText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
    },
    orderFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontSize: 12,
        color: '#666',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deliveryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryTime: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    trackButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    trackButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },
    reorderButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    reorderButtonText: {
        color: '#444',
        fontWeight: '500',
        fontSize: 14,
    },
    retryButton: {
        backgroundColor: Colors.light.tint,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
}); 