import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Product, products } from '@/app/data';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const productId = id || '1';
    const product = products[productId];

    const [selectedSize, setSelectedSize] = useState(product.sizes[1].size);
    const [quantity, setQuantity] = useState(1);
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

    const toggleTopping = (toppingId: string) => {
        setSelectedToppings(prev =>
            prev.includes(toppingId)
                ? prev.filter(id => id !== toppingId)
                : [...prev, toppingId]
        );
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const calculateTotal = () => {
        // Base price from selected size
        const sizePrice = product.sizes.find(s => s.size === selectedSize)?.price || 0;

        // Add topping prices
        const toppingsPrice = selectedToppings.reduce((total, toppingId) => {
            const topping = product.toppings.find(t => t.id === toppingId);
            return total + (topping?.price || 0);
        }, 0);

        return (sizePrice + toppingsPrice) * quantity;
    };

    const addToCart = () => {
        // In a real app, this would add the product to Redux or context state
        // For now, we'll just navigate back to the menu
        router.push('/(tabs)/cart');
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <Image source={product.image} style={styles.productImage} />

                <View style={styles.content}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Select Size</Text>
                        <View style={styles.sizeContainer}>
                            {product.sizes.map((size) => (
                                <TouchableOpacity
                                    key={size.size}
                                    style={[
                                        styles.sizeOption,
                                        selectedSize === size.size && styles.selectedSizeOption
                                    ]}
                                    onPress={() => setSelectedSize(size.size)}
                                >
                                    <Text
                                        style={[
                                            styles.sizeText,
                                            selectedSize === size.size && styles.selectedSizeText
                                        ]}
                                    >
                                        {size.size}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.sizePrice,
                                            selectedSize === size.size && styles.selectedSizeText
                                        ]}
                                    >
                                        ${size.price.toFixed(2)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Add Toppings</Text>
                        {product.toppings.map((topping) => (
                            <TouchableOpacity
                                key={topping.id}
                                style={styles.toppingItem}
                                onPress={() => toggleTopping(topping.id)}
                            >
                                <View style={styles.toppingInfoContainer}>
                                    <View
                                        style={[
                                            styles.checkbox,
                                            selectedToppings.includes(topping.id) && styles.checkboxSelected
                                        ]}
                                    >
                                        {selectedToppings.includes(topping.id) && (
                                            <Ionicons name="checkmark" size={12} color="#fff" />
                                        )}
                                    </View>
                                    <Text style={styles.toppingName}>{topping.name}</Text>
                                </View>
                                <Text style={styles.toppingPrice}>+${topping.price.toFixed(2)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Quantity</Text>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                                <Ionicons name="remove" size={20} color={Colors.light.tint} />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                                <Ionicons name="add" size={20} color={Colors.light.tint} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalPrice}>${calculateTotal().toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
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
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sizeOption: {
        flex: 1,
        marginHorizontal: 4,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    selectedSizeOption: {
        borderColor: Colors.light.tint,
        backgroundColor: Colors.light.tint + '10', // 10% opacity
    },
    sizeText: {
        fontSize: 14,
        fontWeight: '500',
    },
    sizePrice: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    selectedSizeText: {
        color: Colors.light.tint,
    },
    toppingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    toppingInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: Colors.light.tint,
        borderColor: Colors.light.tint,
    },
    toppingName: {
        fontSize: 16,
    },
    toppingPrice: {
        fontSize: 14,
        color: Colors.light.tint,
        fontWeight: '500',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        alignSelf: 'flex-start',
        overflow: 'hidden',
    },
    quantityButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 12,
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    priceContainer: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 12,
        color: '#666',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    addToCartButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
}); 