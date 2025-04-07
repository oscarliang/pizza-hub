import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getImage } from '@/constants/ImagePlaceholders';

interface FavoriteOrderItem {
    id: string;
    name: string;
    items: string[];
    totalPrice: string;
    image: any;
    date: string;
}

export default function FavoriteOrdersScreen() {
    // Mock data - in a real app, this would come from a backend API
    const [favoriteOrders, setFavoriteOrders] = useState<FavoriteOrderItem[]>([
        {
            id: '1',
            name: 'Pizza Party',
            items: [
                '1 x Large Pepperoni Pizza',
                '1 x Medium Hawaiian Pizza',
                '1 x Garlic Bread',
                '2 x Coke (600ml)',
            ],
            totalPrice: '$42.96',
            image: getImage('pizza1'),
            date: '2023-05-15',
        },
        {
            id: '2',
            name: 'Family Feast',
            items: [
                '1 x Large Supreme Pizza',
                '1 x Medium BBQ Meatlovers',
                '2 x Garlic Bread',
                '1 x Potato Wedges',
                '4 x Coke (600ml)',
            ],
            totalPrice: '$69.95',
            image: getImage('pizza2'),
            date: '2023-04-28',
        },
        {
            id: '3',
            name: 'Quick Lunch',
            items: [
                '1 x Medium Pepperoni Pizza',
                '1 x Garlic Bread',
                '1 x Coke (600ml)',
            ],
            totalPrice: '$24.97',
            image: getImage('pizza1'),
            date: '2023-04-10',
        },
    ]);

    const removeFavorite = (id: string) => {
        Alert.alert(
            'Remove Favorite',
            'Are you sure you want to remove this favorite order?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => {
                        setFavoriteOrders(favoriteOrders.filter(order => order.id !== id));
                    }
                },
            ]
        );
    };

    const addToCart = (order: FavoriteOrderItem) => {
        // In a real app, this would add all items from the order to the cart
        Alert.alert(
            'Add to Cart',
            `"${order.name}" has been added to your cart.`,
            [{ text: 'OK', onPress: () => router.push('/(tabs)/cart') }]
        );
    };

    const reorderNow = (order: FavoriteOrderItem) => {
        // In a real app, this would add items to cart and navigate to checkout
        Alert.alert(
            'Reorder Now',
            `Your order "${order.name}" is being processed.`,
            [{ text: 'OK', onPress: () => router.push('/(tabs)/cart') }]
        );
    };

    const editFavorite = (order: FavoriteOrderItem) => {
        // In a real app, this would navigate to an edit page or show a modal
        Alert.alert('Edit Favorite', 'This feature is coming soon!');
    };

    const renderFavoriteItem = (order: FavoriteOrderItem) => (
        <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View style={styles.orderTitleContainer}>
                    <Text style={styles.orderName}>{order.name}</Text>
                    <Text style={styles.orderDate}>Last ordered: {formatDate(order.date)}</Text>
                </View>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => editFavorite(order)}
                    >
                        <Ionicons name="pencil" size={18} color={Colors.light.tint} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => removeFavorite(order.id)}
                    >
                        <Ionicons name="trash-outline" size={18} color="#ff3b30" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.orderContent}>
                <Image source={order.image} style={styles.orderImage} />
                <View style={styles.orderDetails}>
                    {order.items.map((item, index) => (
                        <Text key={index} style={styles.orderItem}>
                            {item}
                        </Text>
                    ))}
                    <Text style={styles.orderPrice}>Total: {order.totalPrice}</Text>
                </View>
            </View>

            <View style={styles.orderFooter}>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => addToCart(order)}
                >
                    <Ionicons name="cart-outline" size={16} color={Colors.light.tint} />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.reorderButton}
                    onPress={() => reorderNow(order)}
                >
                    <Text style={styles.reorderText}>Reorder Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Favorite Orders</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                {favoriteOrders.length > 0 ? (
                    favoriteOrders.map(order => renderFavoriteItem(order))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="heart-outline" size={60} color="#ccc" />
                        <Text style={styles.emptyStateTitle}>No Favorite Orders</Text>
                        <Text style={styles.emptyStateText}>
                            Orders you mark as favorites will appear here for easy reordering.
                        </Text>
                        <TouchableOpacity
                            style={styles.startOrderingButton}
                            onPress={() => router.push('/(tabs)/menu')}
                        >
                            <Text style={styles.startOrderingText}>Start Ordering</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    orderTitleContainer: {
        flex: 1,
    },
    orderName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    actionsContainer: {
        flexDirection: 'row',
    },
    editButton: {
        padding: 6,
        marginRight: 8,
    },
    deleteButton: {
        padding: 6,
    },
    orderContent: {
        flexDirection: 'row',
        padding: 16,
    },
    orderImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    orderDetails: {
        flex: 1,
        marginLeft: 16,
    },
    orderItem: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    orderPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginTop: 8,
    },
    orderFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 12,
        borderRightWidth: 1,
        borderRightColor: '#eee',
    },
    addToCartText: {
        color: Colors.light.tint,
        fontWeight: '500',
        marginLeft: 8,
    },
    reorderButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: Colors.light.tint,
    },
    reorderText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 20,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    startOrderingButton: {
        backgroundColor: Colors.light.tint,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    startOrderingText: {
        color: '#fff',
        fontWeight: 'bold',
    },
}); 