import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Linking, Platform } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapFallback from './MapFallback';
import { Order, Location, TrackingInfo } from '@/app/redux';

// Only import react-native-maps on native platforms
let MapView: any, Marker: any, PROVIDER_GOOGLE: any;
if ((Platform.OS as string) !== 'web') {
    ({ MapView, Marker, PROVIDER_GOOGLE } = require('react-native-maps'));
}

// Define the Region type if not importing from react-native-maps
interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

// Define props interface for reuse
export interface OrderTrackerProps {
    order: Order;
    customerLocation?: Location;
    restaurantLocation?: Location;
}

// Define default locations (can be overridden by props)
export const DEFAULT_RESTAURANT_LOCATION: Location = {
    latitude: 40.7128,
    longitude: -74.0060,
};

export const DEFAULT_CUSTOMER_LOCATION: Location = {
    latitude: 40.7282,
    longitude: -73.9940,
};

const OrderTracker: React.FC<OrderTrackerProps> = ({
    order,
    customerLocation = DEFAULT_CUSTOMER_LOCATION,
    restaurantLocation = DEFAULT_RESTAURANT_LOCATION,
}) => {
    const { tracking } = order;
    const [mapRegion, setMapRegion] = useState<Region>({
        latitude: tracking.currentLocation?.latitude || restaurantLocation.latitude,
        longitude: tracking.currentLocation?.longitude || restaurantLocation.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
    });

    // Update the map region when the delivery person's location changes
    useEffect(() => {
        if (tracking.currentLocation) {
            setMapRegion({
                ...mapRegion,
                latitude: tracking.currentLocation.latitude,
                longitude: tracking.currentLocation.longitude,
            });
        }
    }, [tracking.currentLocation]);

    // Function to call the delivery person
    const callDeliveryPerson = () => {
        if (tracking.deliveryPersonPhone) {
            Linking.openURL(`tel:${tracking.deliveryPersonPhone}`);
        }
    };

    // Function to open maps app with directions
    const openMapsWithDirections = () => {
        if (!tracking.currentLocation) return;

        let url: string | undefined;

        if (Platform.OS === 'ios') {
            const scheme = 'maps:0,0?q=';
            const latLng = `${tracking.currentLocation.latitude},${tracking.currentLocation.longitude}`;
            const label = 'Delivery Person';
            url = `${scheme}${label}@${latLng}`;
        } else if (Platform.OS === 'android') {
            const scheme = 'geo:0,0?q=';
            const latLng = `${tracking.currentLocation.latitude},${tracking.currentLocation.longitude}`;
            const label = 'Delivery Person';
            url = `${scheme}${latLng}(${label})`;
        }

        if (url) {
            Linking.openURL(url);
        }
    };

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
                {Platform.OS === 'web' ? (
                    <MapFallback
                        order={order}
                        customerLocation={customerLocation}
                    />
                ) : (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={mapRegion}
                        showsUserLocation={false}
                        showsMyLocationButton={false}
                    >
                        {/* Restaurant Marker */}
                        {(Platform.OS as string) !== 'web' && (
                            <>
                                <Marker
                                    coordinate={restaurantLocation}
                                    title="Restaurant"
                                    description="Pizza Hub"
                                >
                                    <View style={styles.markerContainer}>
                                        <MaterialIcons name="restaurant" size={24} color="white" />
                                    </View>
                                </Marker>

                                {/* Delivery Person Marker */}
                                {tracking.currentLocation && tracking.status === 'out-for-delivery' && (
                                    <Marker
                                        coordinate={tracking.currentLocation}
                                        title={tracking.deliveryPersonName || 'Delivery Person'}
                                        description="Your order is on the way"
                                    >
                                        <View style={[styles.markerContainer, styles.deliveryMarker]}>
                                            <MaterialIcons name="delivery-dining" size={24} color="white" />
                                        </View>
                                    </Marker>
                                )}

                                {/* Customer Marker */}
                                <Marker
                                    coordinate={customerLocation}
                                    title="Delivery Location"
                                    description={order.deliveryAddress.street}
                                >
                                    <View style={[styles.markerContainer, styles.customerMarker]}>
                                        <Ionicons name="location" size={24} color="white" />
                                    </View>
                                </Marker>
                            </>
                        )}
                    </MapView>
                )}
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
                            <TouchableOpacity style={styles.actionButton} onPress={callDeliveryPerson}>
                                <Ionicons name="call" size={22} color={Colors.light.tint} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton} onPress={openMapsWithDirections}>
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
    map: {
        width: '100%',
        height: '100%',
    },
    markerContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 20,
        padding: 8,
        borderWidth: 2,
        borderColor: 'white',
    },
    deliveryMarker: {
        backgroundColor: '#2196f3',
    },
    customerMarker: {
        backgroundColor: '#4caf50',
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

// Import the platform-specific implementations - these imports will be resolved correctly
// based on the platform when the app is built
let OrderTrackerNative, OrderTrackerWeb;

try {
    // Dynamic imports to avoid issues with SSR
    OrderTrackerNative = require('./OrderTracker.native').default;
    OrderTrackerWeb = require('./OrderTracker.web').default;
} catch (error) {
    console.warn('Error loading platform-specific OrderTracker components:', error);
}

// Export the appropriate component based on platform
export default Platform.select({
    web: OrderTrackerWeb,
    default: OrderTrackerNative,
}); 