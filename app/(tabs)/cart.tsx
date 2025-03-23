import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { getImage } from '@/constants/ImagePlaceholders';

interface CartItem {
    id: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    image: any;
}

export default function CartScreen() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            name: 'Pepperoni Pizza',
            size: 'Large',
            price: 15.99,
            quantity: 1,
            image: getImage('pizza1'),
        },
        {
            id: '2',
            name: 'Supreme Pizza',
            size: 'Medium',
            price: 14.99,
            quantity: 2,
            image: getImage('pizza2'),
        },
        {
            id: '3',
            name: 'Garlic Bread',
            size: 'Regular',
            price: 4.99,
            quantity: 1,
            image: getImage('sides1'),
        },
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const increaseQuantity = (id: string) => {
        setCartItems(
            cartItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id: string) => {
        setCartItems(
            cartItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 5.99;
    const total = subtotal + deliveryFee - discount;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart</Text>
            </View>

            {cartItems.length === 0 ? (
                <View style={styles.emptyCart}>
                    <Ionicons name="cart-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <TouchableOpacity style={styles.startShoppingButton}>
                        <Text style={styles.startShoppingButtonText}>Start Shopping</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView style={styles.cartItemsContainer}>
                        {cartItems.map(item => (
                            <View key={item.id} style={styles.cartItem}>
                                <Image source={item.image} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <View>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemSize}>{item.size}</Text>
                                    </View>
                                    <View style={styles.itemActions}>
                                        <View style={styles.quantityControl}>
                                            <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                                                <Ionicons name="remove-circle" size={24} color={Colors.light.tint} />
                                            </TouchableOpacity>
                                            <Text style={styles.quantity}>{item.quantity}</Text>
                                            <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                                                <Ionicons name="add-circle" size={24} color={Colors.light.tint} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
                                    <Ionicons name="close" size={20} color="#999" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <View style={styles.promoContainer}>
                            <View style={styles.promoInputContainer}>
                                <FontAwesome name="ticket" size={18} color="#999" />
                                <Text style={styles.promoPlaceholder}>Enter promo code</Text>
                            </View>
                            <TouchableOpacity style={styles.applyButton}>
                                <Text style={styles.applyButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.summaryContainer}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
                            </View>
                            {discount > 0 && (
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Discount</Text>
                                    <Text style={[styles.summaryValue, styles.discountText]}>-${discount.toFixed(2)}</Text>
                                </View>
                            )}
                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </>
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
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
    },
    emptyCartText: {
        fontSize: 18,
        color: '#999',
        marginTop: 16,
        marginBottom: 24,
    },
    startShoppingButton: {
        backgroundColor: Colors.light.tint,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    startShoppingButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cartItemsContainer: {
        flex: 1,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 1,
        position: 'relative',
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemSize: {
        fontSize: 14,
        color: '#666',
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    promoInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginRight: 12,
    },
    promoPlaceholder: {
        marginLeft: 8,
        color: '#999',
    },
    applyButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    summaryContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 24,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    summaryLabel: {
        color: '#666',
    },
    summaryValue: {
        fontWeight: '500',
    },
    discountText: {
        color: '#28a745',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 8,
        paddingTop: 16,
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.light.tint,
    },
    footer: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    checkoutButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
}); 