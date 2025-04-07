import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { homeCategories, promotions, CategoryItem, PromotionItem } from '@/app/data';

export default function HomeScreen() {
  const [address, setAddress] = useState('123 Main St, Sydney');
  const router = useRouter();

  const renderPromotionItem = ({ item }: { item: PromotionItem }) => (
    <TouchableOpacity
      style={styles.promotionItem}
      onPress={() => router.push({ pathname: '/(shop)/deal-detail', params: { id: item.id } })}
    >
      <Image source={item.image} style={styles.promotionImage} />
      <View style={styles.promotionContent}>
        <Text style={styles.promotionTitle}>{item.title}</Text>
        <Text style={styles.promotionDiscount}>{item.discount}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => router.push({ pathname: '/(shop)/category-detail', params: { id: item.id } })}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addressContainer}>
          <Ionicons name="location" size={24} color={Colors.light.tint} />
          <Text style={styles.addressText}>{address}</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />
          <Text style={styles.searchText}>Search for pizzas, sides, drinks...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Deals & Offers</Text>
        <FlatList
          data={promotions}
          renderItem={renderPromotionItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promotionList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={homeCategories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => router.push('/(tabs)/menu')}
      >
        <Text style={styles.orderButtonText}>Start Your Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 4,
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
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  promotionList: {
    paddingVertical: 8,
  },
  promotionItem: {
    width: 280,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promotionImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  promotionContent: {
    padding: 12,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promotionDiscount: {
    fontSize: 14,
    color: Colors.light.tint,
  },
  categoryList: {
    paddingVertical: 8,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
