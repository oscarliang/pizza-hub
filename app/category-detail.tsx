import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '@/constants/ImagePlaceholders';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    image: any;
    category: string;
}

const categories: {
    [key: string]: {
        id: string,
        name: string,
        image: any,
        description: string
    }
} = {
    '1': {
        id: '1',
        name: 'Pizza',
        image: getImage('category-pizza'),
        description: 'Our authentic Italian pizzas are handcrafted with the finest ingredients and baked to perfection in our stone ovens.'
    },
    '2': {
        id: '2',
        name: 'Sides',
        image: getImage('category-sides'),
        description: 'Complete your meal with our delicious sides. From garlic bread to chicken wings, we have something for everyone.'
    },
    '3': {
        id: '3',
        name: 'Drinks',
        image: getImage('category-drinks'),
        description: 'Refresh yourself with our selection of soft drinks, juices, and bottled water.'
    },
    '4': {
        id: '4',
        name: 'Desserts',
        image: getImage('category-desserts'),
        description: 'End your meal on a sweet note with our delicious desserts. From chocolate lava cake to ice cream, we have the perfect treat.'
    },
};

const menuItems: MenuItem[] = [
    {
        id: '1',
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, special tomato sauce',
        price: '$15.99',
        image: getImage('pizza1'),
        category: '1'
    },
    {
        id: '2',
        name: 'Supreme Pizza',
        description: 'Pepperoni, ham, beef, mushrooms, onions, capsicum, olives',
        price: '$18.99',
        image: getImage('pizza2'),
        category: '1'
    },
    {
        id: '3',
        name: 'Hawaiian Pizza',
        description: 'Ham, pineapple, mozzarella',
        price: '$14.99',
        image: getImage('pizza3'),
        category: '1'
    },
    {
        id: '4',
        name: 'BBQ Meatlovers',
        description: 'BBQ sauce, beef, pepperoni, ham, bacon, mozzarella',
        price: '$19.99',
        image: getImage('pizza4'),
        category: '1'
    },
    {
        id: '5',
        name: 'Vegetarian',
        description: 'Tomato, mushrooms, onions, capsicum, olives, mozzarella',
        price: '$16.99',
        image: getImage('pizza5'),
        category: '1'
    },
    {
        id: '6',
        name: 'Garlic Bread',
        description: 'Freshly baked bread with garlic butter',
        price: '$4.99',
        image: getImage('sides1'),
        category: '2'
    },
    {
        id: '7',
        name: 'Chicken Wings',
        description: 'Spicy chicken wings with blue cheese dip',
        price: '$9.99',
        image: getImage('sides2'),
        category: '2'
    },
    {
        id: '8',
        name: 'Potato Wedges',
        description: 'Seasoned potato wedges with sour cream and sweet chili sauce',
        price: '$6.99',
        image: getImage('sides3'),
        category: '2'
    },
    {
        id: '9',
        name: 'Coke',
        description: '600ml bottle',
        price: '$3.99',
        image: getImage('drink1'),
        category: '3'
    },
    {
        id: '10',
        name: 'Sprite',
        description: '600ml bottle',
        price: '$3.99',
        image: getImage('drink2'),
        category: '3'
    },
    {
        id: '11',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey center',
        price: '$7.99',
        image: getImage('dessert1'),
        category: '4'
    },
    {
        id: '12',
        name: 'New York Cheesecake',
        description: 'Classic New York style cheesecake',
        price: '$6.99',
        image: getImage('dessert2'),
        category: '4'
    }
];

export default function CategoryDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const categoryId = id || '1';
    const category = categories[categoryId];
    const filteredItems = menuItems.filter(item => item.category === categoryId);

    const renderMenuItem = ({ item }: { item: MenuItem }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push({ pathname: '/(shop)/product-detail', params: { id: item.id } })}
        >
            <Image source={item.image} style={styles.menuItemImage} />
            <View style={styles.menuItemContent}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                <View style={styles.menuItemFooter}>
                    <Text style={styles.menuItemPrice}>{item.price}</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => router.push({ pathname: '/(shop)/product-detail', params: { id: item.id } })}
                    >
                        <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{category.name}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.categoryHeader}>
                    <Image source={category.image} style={styles.categoryImage} />
                    <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>

                <View style={styles.menuList}>
                    <FlatList
                        data={filteredItems}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>
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
    },
    categoryHeader: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    categoryImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 12,
        marginBottom: 12,
    },
    categoryDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    menuList: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuItemImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    menuItemContent: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    menuItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    menuItemDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    menuItemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    addButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 