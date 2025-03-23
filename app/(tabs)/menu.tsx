import React, { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '@/constants/ImagePlaceholders';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    image: any;
}

const categories = [
    { id: '1', name: 'Best Sellers' },
    { id: '2', name: 'Premium' },
    { id: '3', name: 'Traditional' },
    { id: '4', name: 'Value Range' },
    { id: '5', name: 'Vegan' },
];

const menuItems: MenuItem[] = [
    {
        id: '1',
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, special tomato sauce',
        price: '$15.99',
        image: getImage('pizza1'),
    },
    {
        id: '2',
        name: 'Supreme Pizza',
        description: 'Pepperoni, ham, beef, mushrooms, onions, capsicum, olives',
        price: '$18.99',
        image: getImage('pizza2'),
    },
    {
        id: '3',
        name: 'Hawaiian Pizza',
        description: 'Ham, pineapple, mozzarella',
        price: '$14.99',
        image: getImage('pizza3'),
    },
    {
        id: '4',
        name: 'BBQ Meatlovers',
        description: 'BBQ sauce, beef, pepperoni, ham, bacon, mozzarella',
        price: '$19.99',
        image: getImage('pizza4'),
    },
    {
        id: '5',
        name: 'Vegetarian',
        description: 'Tomato, mushrooms, onions, capsicum, olives, mozzarella',
        price: '$16.99',
        image: getImage('pizza5'),
    },
];

export default function MenuScreen() {
    const [selectedCategory, setSelectedCategory] = useState('1');

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

    const renderMenuItem = ({ item }: { item: MenuItem }) => (
        <TouchableOpacity style={styles.menuItem}>
            <Image source={item.image} style={styles.menuItemImage} />
            <View style={styles.menuItemContent}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                <View style={styles.menuItemFooter}>
                    <Text style={styles.menuItemPrice}>{item.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="gray" />
                    <Text style={styles.searchText}>Search for pizzas, sides, drinks...</Text>
                </TouchableOpacity>
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

            <ScrollView style={styles.menuList}>
                <Text style={styles.sectionTitle}>{categories.find(c => c.id === selectedCategory)?.name}</Text>
                <FlatList
                    data={menuItems}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                />
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
        padding: 16,
        backgroundColor: '#fff',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 12,
    },
    searchText: {
        color: 'gray',
        marginLeft: 8,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
        marginHorizontal: 16,
    },
    menuList: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 16,
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