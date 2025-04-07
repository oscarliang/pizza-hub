import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getImage } from '@/constants/ImagePlaceholders';

interface OfferItem {
    id: string;
    title: string;
    description: string;
    code: string;
    discount: string;
    validUntil: string;
    image: any;
    isNew: boolean;
    categoryIds: string[];
}

const categories = [
    { id: 'all', name: 'All Offers' },
    { id: 'pizza', name: 'Pizzas' },
    { id: 'sides', name: 'Sides' },
    { id: 'combo', name: 'Combos' },
    { id: 'delivery', name: 'Delivery' },
];

export default function SpecialOffersScreen() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Mock data - in a real app, these would come from a backend API
    const [offers, setOffers] = useState<OfferItem[]>([
        {
            id: '1',
            title: 'Buy 1 Get 1 Free',
            description: 'Order any large pizza and get another one absolutely free! Perfect for sharing with family and friends.',
            code: 'BOGO',
            discount: 'Get a free pizza',
            validUntil: '2023-07-30',
            image: getImage('promotion1'),
            isNew: true,
            categoryIds: ['pizza', 'combo'],
        },
        {
            id: '2',
            title: '30% Off on Large Pizzas',
            description: 'Enjoy 30% off on all large pizzas when you order online. Perfect for game nights or family gatherings!',
            code: 'LARGE30',
            discount: '30% off',
            validUntil: '2023-07-15',
            image: getImage('promotion2'),
            isNew: false,
            categoryIds: ['pizza'],
        },
        {
            id: '3',
            title: 'Free Garlic Bread',
            description: 'Get a free garlic bread with any order above $30. The perfect side to complement your pizza!',
            code: 'FREEBREAD',
            discount: 'Free garlic bread',
            validUntil: '2023-12-31',
            image: getImage('promotion3'),
            isNew: false,
            categoryIds: ['sides', 'combo'],
        },
        {
            id: '4',
            title: 'Free Delivery on Orders Over $25',
            description: 'Get free delivery on all orders over $25. No code needed, discount automatically applied at checkout.',
            code: 'FREEDEL',
            discount: 'Free delivery',
            validUntil: '2023-08-15',
            image: getImage('promotion1'),
            isNew: true,
            categoryIds: ['delivery'],
        },
        {
            id: '5',
            title: 'Student Special: 20% Off',
            description: 'Students get 20% off on all orders with valid student ID. Perfect for those late-night study sessions!',
            code: 'STUDENT20',
            discount: '20% off',
            validUntil: '2023-12-31',
            image: getImage('promotion2'),
            isNew: false,
            categoryIds: ['pizza', 'sides', 'combo'],
        },
    ]);

    const filteredOffers = selectedCategory === 'all'
        ? offers
        : offers.filter(offer => offer.categoryIds.includes(selectedCategory));

    const applyOffer = (offer: OfferItem) => {
        Alert.alert(
            'Apply Offer',
            `Promo code "${offer.code}" has been copied. Would you like to start ordering now?`,
            [
                { text: 'Maybe Later', style: 'cancel' },
                { text: 'Order Now', onPress: () => router.push('/(tabs)/menu') }
            ]
        );
    };

    const viewOfferDetails = (offer: OfferItem) => {
        router.push({
            pathname: '/deal-detail',
            params: { id: offer.id }
        });
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const isOfferExpired = (validUntilDate: string) => {
        const today = new Date();
        const validUntil = new Date(validUntilDate);
        return validUntil < today;
    };

    const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory === item.id && styles.categoryItemSelected,
            ]}
            onPress={() => setSelectedCategory(item.id)}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === item.id && styles.categoryTextSelected
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderOfferItem = ({ item }: { item: OfferItem }) => {
        const expired = isOfferExpired(item.validUntil);

        return (
            <View style={[styles.offerCard, expired && styles.expiredOfferCard]}>
                {item.isNew && !expired && (
                    <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                )}

                {expired && (
                    <View style={styles.expiredBadge}>
                        <Text style={styles.expiredBadgeText}>EXPIRED</Text>
                    </View>
                )}

                <Image source={item.image} style={styles.offerImage} />

                <View style={styles.offerContent}>
                    <Text style={styles.offerTitle}>{item.title}</Text>
                    <Text style={styles.offerDescription} numberOfLines={2}>
                        {item.description}
                    </Text>

                    <View style={styles.offerMeta}>
                        <View style={styles.codeContainer}>
                            <Text style={styles.codeLabel}>Code:</Text>
                            <Text style={styles.codeValue}>{item.code}</Text>
                        </View>
                        <Text style={styles.validUntil}>
                            Valid until: {formatDate(item.validUntil)}
                        </Text>
                    </View>

                    <View style={styles.offerActions}>
                        <TouchableOpacity
                            style={styles.viewDetailsButton}
                            onPress={() => viewOfferDetails(item)}
                        >
                            <Text style={styles.viewDetailsText}>View Details</Text>
                        </TouchableOpacity>

                        {!expired && (
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() => applyOffer(item)}
                            >
                                <Text style={styles.applyButtonText}>Apply</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Special Offers & Promotions</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.categoriesContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>

            {filteredOffers.length > 0 ? (
                <FlatList
                    data={filteredOffers}
                    renderItem={renderOfferItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.offersList}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="pricetag-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyStateTitle}>No Offers Available</Text>
                    <Text style={styles.emptyStateText}>
                        There are no offers available in this category at the moment.
                    </Text>
                </View>
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
    categoriesContainer: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        marginBottom: 8,
    },
    categoriesList: {
        paddingHorizontal: 16,
    },
    categoryItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    categoryItemSelected: {
        backgroundColor: Colors.light.tint,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTextSelected: {
        color: '#fff',
    },
    offersList: {
        padding: 16,
    },
    offerCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    expiredOfferCard: {
        opacity: 0.7,
    },
    offerImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    offerContent: {
        padding: 16,
    },
    offerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    offerDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        lineHeight: 20,
    },
    offerMeta: {
        marginBottom: 16,
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    codeLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
    },
    codeValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    validUntil: {
        fontSize: 14,
        color: '#666',
    },
    offerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewDetailsButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.light.tint,
    },
    viewDetailsText: {
        color: Colors.light.tint,
        fontWeight: '500',
    },
    applyButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        backgroundColor: Colors.light.tint,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    newBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#4caf50',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        zIndex: 1,
    },
    newBadgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    expiredBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#f44336',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        zIndex: 1,
    },
    expiredBadgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
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
    },
}); 