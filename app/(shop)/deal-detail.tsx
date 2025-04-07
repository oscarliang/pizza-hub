import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { deals, DealItem } from '@/app/data';

export default function DealDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dealId = id || '1';
    const deal = deals[dealId];
    const router = useRouter();

    const handleOrderNow = () => {
        router.push('/(tabs)/menu');
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <Image source={deal.image} style={styles.dealImage} />

                <View style={styles.content}>
                    <Text style={styles.title}>{deal.title}</Text>
                    <Text style={styles.description}>{deal.description}</Text>

                    <View style={styles.detailCard}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Discount:</Text>
                            <Text style={styles.detailValue}>{deal.discount}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Promo Code:</Text>
                            <View style={styles.codeContainer}>
                                <Text style={styles.code}>{deal.code}</Text>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Valid Until:</Text>
                            <Text style={styles.detailValue}>{deal.validUntil}</Text>
                        </View>
                    </View>

                    <Text style={styles.termsTitle}>Terms & Conditions</Text>
                    {deal.terms.map((term, index) => (
                        <View key={index} style={styles.termItem}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.termText}>{term}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleOrderNow}>
                    <Text style={styles.buttonText}>Order Now</Text>
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
    dealImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        marginBottom: 24,
    },
    detailCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    codeContainer: {
        backgroundColor: Colors.light.tint,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    code: {
        color: '#fff',
        fontWeight: 'bold',
    },
    termsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    termItem: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    bulletPoint: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.light.tint,
        marginRight: 8,
        marginTop: 6,
    },
    termText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
}); 