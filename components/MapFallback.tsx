import React from 'react';
import { StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

// Import the types
import { Order, Location } from '@/app/redux';

interface MapFallbackProps {
    order?: Order;
    customerLocation?: Location;
}

export default function MapFallback({ order, customerLocation }: MapFallbackProps) {
    const openGoogleMaps = () => {
        if (order?.deliveryAddress) {
            const address = encodeURIComponent(
                `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.zipCode}`
            );
            Linking.openURL(`https://maps.google.com/?q=${address}`);
        } else if (customerLocation) {
            Linking.openURL(`https://maps.google.com/?q=${customerLocation.latitude},${customerLocation.longitude}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Live Tracking</Text>
            <Text style={styles.message}>
                Map tracking is not available on web version.
            </Text>
            {(order?.deliveryAddress || customerLocation) && (
                <TouchableOpacity
                    onPress={openGoogleMaps}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>View in Google Maps</Text>
                </TouchableOpacity>
            )}
            {order?.tracking?.status === 'out-for-delivery' && (
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        Your order is on the way! {order.tracking.deliveryPersonName || 'Your delivery person'} will arrive in approximately {order.tracking.estimatedDeliveryTime || 'a few minutes'}.
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        color: Colors.light.tint,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.light.tint,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    infoContainer: {
        backgroundColor: Colors.light.background,
        borderRadius: 8,
        padding: 16,
        marginTop: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    infoText: {
        fontSize: 14,
        lineHeight: 20,
    }
}); 