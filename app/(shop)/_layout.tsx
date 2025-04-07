import React from 'react';
import { Stack } from 'expo-router';

export default function ShopLayout() {
    return (
        <Stack>
            <Stack.Screen name="product-detail" options={{ headerShown: false }} />
            <Stack.Screen name="category-detail" options={{ headerShown: false }} />
            <Stack.Screen name="deal-detail" options={{ headerShown: false }} />
        </Stack>
    );
} 