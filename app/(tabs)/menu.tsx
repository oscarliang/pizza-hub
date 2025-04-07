import React, { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { menuCategories, menuItems, MenuItem } from '@/app/data';

export default function MenuScreen() {
    const [selectedCategory, setSelectedCategory] = useState('1');
    const router = useRouter();

    // Filter menu items based on selected category
    // Since the data doesn't have category on menuItems, we're just using the first 5 items for all categories
    // In a real app, this would filter based on an actual category property
    const filteredMenuItems = menuItems;

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
                        onPress={(e) => {
                            e.stopPropagation();
                            router.push({ pathname: '/(shop)/product-detail', params: { id: item.id } });
                        }}
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
                <TouchableOpacity style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="gray" />
                    <Text style={styles.searchText}>Search for pizzas, sides, drinks...</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.categoriesContainer}>
                <FlatList
                    data={menuCategories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>

            <ScrollView style={styles.menuList}>
                <Text style={styles.sectionTitle}>{menuCategories.find(c => c.id === selectedCategory)?.name}</Text>
                <FlatList
                    data={filteredMenuItems}
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