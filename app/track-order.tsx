import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import OrderTracker from '@/components/OrderTracker';
import { useAppDispatch, useAppSelector, fetchOrderById } from '@/app/redux';
import { Colors } from '@/constants/Colors';

export default function TrackOrderScreen() {
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
    const dispatch = useAppDispatch();
    const { orders, activeOrderId, isLoading, error } = useAppSelector((state) => state.orders);
    const activeOrder = orders.find(order => order.id === activeOrderId);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderById(orderId));
        }
    }, [dispatch, orderId]);

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Track Order',
                    headerTitleStyle: styles.headerTitle,
                }}
            />

            {isLoading && (
                <ThemedView style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.light.tint} />
                    <ThemedText style={styles.loadingText}>Loading order details...</ThemedText>
                </ThemedView>
            )}

            {error && (
                <ThemedView style={styles.errorContainer}>
                    <ThemedText style={styles.errorText}>
                        Error loading order: {error}
                    </ThemedText>
                </ThemedView>
            )}

            {!isLoading && !error && !activeOrder && (
                <ThemedView style={styles.errorContainer}>
                    <ThemedText style={styles.errorText}>
                        Order not found. Please check the order ID and try again.
                    </ThemedText>
                </ThemedView>
            )}

            {!isLoading && !error && activeOrder && (
                <ScrollView style={styles.scrollView}>
                    <OrderTracker order={activeOrder} />

                    <ThemedView style={styles.orderDetailsCard}>
                        <ThemedText style={styles.orderDetailsTitle}>Order Details</ThemedText>

                        <ThemedView style={styles.orderDetail}>
                            <ThemedText style={styles.orderDetailLabel}>Order Number:</ThemedText>
                            <ThemedText style={styles.orderDetailValue}>{activeOrder.orderNumber}</ThemedText>
                        </ThemedView>

                        <ThemedView style={styles.orderDetail}>
                            <ThemedText style={styles.orderDetailLabel}>Date:</ThemedText>
                            <ThemedText style={styles.orderDetailValue}>{activeOrder.createdAt}</ThemedText>
                        </ThemedView>

                        <ThemedView style={styles.orderDetail}>
                            <ThemedText style={styles.orderDetailLabel}>Delivery Address:</ThemedText>
                            <ThemedText style={styles.orderDetailValue}>
                                {`${activeOrder.deliveryAddress.street}, ${activeOrder.deliveryAddress.city}, ${activeOrder.deliveryAddress.state} ${activeOrder.deliveryAddress.zipCode}`}
                            </ThemedText>
                        </ThemedView>

                        <ThemedView style={styles.itemsContainer}>
                            <ThemedText style={styles.itemsTitle}>Items</ThemedText>
                            {activeOrder.items.map((item, index) => (
                                <ThemedView key={index} style={styles.orderItem}>
                                    <ThemedView style={styles.itemInfo}>
                                        <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                                        {item.options && Array.isArray(item.options) && item.options.length > 0 && (
                                            <ThemedText style={styles.itemOptions}>
                                                {item.options.join(', ')}
                                            </ThemedText>
                                        )}
                                    </ThemedView>
                                    <ThemedView style={styles.itemDetails}>
                                        <ThemedText style={styles.itemQuantity}>
                                            x{item.quantity}
                                        </ThemedText>
                                        <ThemedText style={styles.itemPrice}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </ThemedText>
                                    </ThemedView>
                                </ThemedView>
                            ))}
                        </ThemedView>

                        <ThemedView style={styles.orderSummary}>
                            <ThemedView style={styles.summaryRow}>
                                <ThemedText style={styles.summaryLabel}>Subtotal</ThemedText>
                                <ThemedText style={styles.summaryValue}>${activeOrder.subtotal.toFixed(2)}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.summaryRow}>
                                <ThemedText style={styles.summaryLabel}>Tax</ThemedText>
                                <ThemedText style={styles.summaryValue}>${activeOrder.tax.toFixed(2)}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.summaryRow}>
                                <ThemedText style={styles.summaryLabel}>Delivery Fee</ThemedText>
                                <ThemedText style={styles.summaryValue}>${activeOrder.deliveryFee.toFixed(2)}</ThemedText>
                            </ThemedView>
                            <ThemedView style={[styles.summaryRow, styles.totalRow]}>
                                <ThemedText style={styles.totalLabel}>Total</ThemedText>
                                <ThemedText style={styles.totalValue}>${activeOrder.total.toFixed(2)}</ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ScrollView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    headerTitle: {
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    orderDetailsCard: {
        backgroundColor: 'white',
        margin: 16,
        marginTop: 0,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    orderDetailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    orderDetail: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    orderDetailLabel: {
        fontSize: 15,
        fontWeight: '500',
        minWidth: 130,
        color: '#666',
    },
    orderDetailValue: {
        fontSize: 15,
        flex: 1,
    },
    itemsContainer: {
        marginTop: 16,
        marginBottom: 16,
    },
    itemsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '500',
    },
    itemOptions: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '500',
    },
    orderSummary: {
        marginTop: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#666',
    },
    summaryValue: {
        fontSize: 15,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
}); 