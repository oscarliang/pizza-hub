import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapFallback from './MapFallback';
import { Order, Location, TrackingInfo } from '@/app/redux';

interface OrderTrackerWebProps {
    order: Order;
    customerLocation?: Location;
    restaurantLocation?: Location;
}

// Default locations (can be overridden by props)
const DEFAULT_RESTAURANT_LOCATION: Location = {
    latitude: 40.7128,
    longitude: -74.0060,
};

const DEFAULT_CUSTOMER_LOCATION: Location = {
    latitude: 40.7282,
    longitude: -73.9940,
};

const OrderTrackerWeb: React.FC<OrderTrackerWebProps> = ({
    order,
    customerLocation = DEFAULT_CUSTOMER_LOCATION,
    restaurantLocation = DEFAULT_RESTAURANT_LOCATION,
}) => {
    const { tracking } = order;

    // Function to get status description
    const getStatusDescription = (status: TrackingInfo['status']) => {
        switch (status) {
            case 'pending':
                return 'Your order has been received.';
            case 'preparing':
                return 'The restaurant is preparing your order.';
            case 'out-for-delivery':
                return `${tracking.deliveryPersonName || 'Your delivery person'} is on the way with your order.`;
            case 'delivered':
                return 'Your order has been delivered. Enjoy!';
            case 'cancelled':
                return 'Your order has been cancelled.';
            default:
                return 'Your order is being processed.';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapFallback
                    order={order}
                    customerLocation={customerLocation}
                />
            </View>

            <View style={styles.statusContainer}>
                <View style={styles.statusHeader}>
                    <Text style={styles.statusTitle}>Order Status</Text>
                    <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                </View>

                <View style={styles.statusDetails}>
                    <View style={styles.statusIconContainer}>
                        {tracking.status === 'pending' && (
                            <Ionicons name="receipt-outline" size={28} color={Colors.light.tint} />
                        )}
                        {tracking.status === 'preparing' && (
                            <Ionicons name="restaurant-outline" size={28} color={Colors.light.tint} />
                        )}
                        {tracking.status === 'out-for-delivery' && (
                            <MaterialIcons name="delivery-dining" size={28} color={Colors.light.tint} />
                        )}
                        {tracking.status === 'delivered' && (
                            <Ionicons name="checkmark-circle" size={28} color="green" />
                        )}
                        {tracking.status === 'cancelled' && (
                            <Ionicons name="close-circle" size={28} color="red" />
                        )}
                    </View>
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.statusText}>
                            {tracking.status.charAt(0).toUpperCase() + tracking.status.slice(1).replace(/-/g, ' ')}
                        </Text>
                        <Text style={styles.statusDescription}>
                            {getStatusDescription(tracking.status)}
                        </Text>
                        {tracking.status === 'out-for-delivery' && (
                            <Text style={styles.deliveryTime}>
                                Estimated arrival: {tracking.estimatedDeliveryTime}
                            </Text>
                        )}
                    </View>
                </View>

                {tracking.status === 'out-for-delivery' && tracking.deliveryPersonName && (
                    <View style={styles.deliveryPersonContainer}>
                        <View style={styles.deliveryPersonInfo}>
                            <View style={styles.deliveryPersonAvatar}>
                                <Ionicons name="person" size={24} color={Colors.light.tint} />
                            </View>
                            <View>
                                <Text style={styles.deliveryPersonName}>{tracking.deliveryPersonName}</Text>
                                <Text style={styles.deliveryPersonRole}>Delivery Partner</Text>
                            </View>
                        </View>
                        <View style={styles.deliveryActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="call" size={22} color={Colors.light.tint} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="navigate" size={22} color={Colors.light.tint} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    mapContainer: {
        height: Dimensions.get('window').height * 0.4,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        overflow: 'hidden',
    },
    statusContainer: {
        backgroundColor: 'white',
        margin: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderNumber: {
        fontSize: 16,
        color: Colors.light.tint,
        fontWeight: '500',
    },
    statusDetails: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    statusIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: `${Colors.light.tint}20`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    statusTextContainer: {
        flex: 1,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statusDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    deliveryTime: {
        fontSize: 14,
        color: Colors.light.tint,
        marginTop: 4,
        fontWeight: '500',
    },
    deliveryPersonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        justifyContent: 'space-between',
    },
    deliveryPersonInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryPersonAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${Colors.light.tint}20`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    deliveryPersonName: {
        fontSize: 16,
        fontWeight: '600',
    },
    deliveryPersonRole: {
        fontSize: 14,
        color: '#666',
    },
    deliveryActions: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${Colors.light.tint}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
});

export default OrderTrackerWeb; 