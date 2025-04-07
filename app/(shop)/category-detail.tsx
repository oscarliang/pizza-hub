import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { categoryMenuItems, detailCategories, MenuItem } from '@/app/data';

export default function CategoryDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const categoryId = id || '1';
    const category = detailCategories[categoryId];
    const filteredItems = categoryMenuItems.filter(item => item.category === categoryId);

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