import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import AddressModal from '@/components/AddressModal';
import { useAppSelector, useAppDispatch } from '@/app/redux';

interface Address {
    id: string;
    label: string;
    street: string;
    apt?: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault?: boolean;
}

export default function AddressesScreen() {
    const dispatch = useAppDispatch();
    const { addresses = [] } = useAppSelector((state) => state.user) || {};

    const [modalVisible, setModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);

    const openAddModal = () => {
        setEditingAddress(undefined);
        setIsEditing(false);
        setModalVisible(true);
    };

    const openEditModal = (address: Address) => {
        setEditingAddress(address);
        setIsEditing(true);
        setModalVisible(true);
    };

    const handleSaveAddress = (addressData: Omit<Address, 'id'> & { id?: string }) => {
        if (isEditing && editingAddress && addressData.id) {
            // Dispatch update address action (to be implemented in Redux)
            console.log('Update address:', { ...addressData, id: editingAddress.id });
        } else {
            // Dispatch add address action (to be implemented in Redux)
            console.log('Add address:', {
                ...addressData,
                id: Math.random().toString(36).substring(2, 9), // Generate temp ID
            });
        }
        setModalVisible(false);
    };

    const handleDeleteAddress = (addressId: string) => {
        // Dispatch delete address action (to be implemented in Redux)
        console.log('Delete address:', addressId);
    };

    const handleSetDefaultAddress = (addressId: string) => {
        // Dispatch set default address action (to be implemented in Redux)
        console.log('Set default address:', addressId);
    };

    const confirmDeleteAddress = (address: Address) => {
        Alert.alert(
            'Delete Address',
            `Are you sure you want to delete the address "${address.label}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => handleDeleteAddress(address.id),
                    style: 'destructive',
                },
            ]
        );
    };

    const renderAddress = ({ item }: { item: Address }) => (
        <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
                <View style={styles.labelContainer}>
                    <Text style={styles.addressLabel}>{item.label}</Text>
                    {item.isDefault && (
                        <View style={styles.defaultBadge}>
                            <Text style={styles.defaultText}>Default</Text>
                        </View>
                    )}
                </View>
                <View style={styles.addressActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => openEditModal(item)}
                    >
                        <Ionicons name="pencil" size={18} color={Colors.light.tint} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => confirmDeleteAddress(item)}
                    >
                        <Ionicons name="trash" size={18} color="#f44336" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.addressDetails}>
                <Text style={styles.addressText}>
                    {item.street}{item.apt ? `, ${item.apt}` : ''}
                </Text>
                <Text style={styles.addressText}>
                    {item.city}, {item.state} {item.zipCode}
                </Text>
            </View>

            {!item.isDefault && (
                <TouchableOpacity
                    style={styles.defaultButton}
                    onPress={() => handleSetDefaultAddress(item.id)}
                >
                    <Text style={styles.defaultButtonText}>Set as Default</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons name="location-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No addresses saved yet</Text>
            <Text style={styles.emptyStateSubtext}>
                Add your first delivery address to get started
            </Text>
        </View>
    );

    // Sample address data (remove when connected to Redux)
    const sampleAddresses: Address[] = [
        {
            id: '1',
            label: 'Home',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            isDefault: true,
        },
        {
            id: '2',
            label: 'Work',
            street: '456 Business Ave',
            apt: 'Suite 500',
            city: 'New York',
            state: 'NY',
            zipCode: '10016',
            isDefault: false,
        },
    ];

    // Use this when connected to Redux: data={addresses}
    const addressData = sampleAddresses;

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Saved Addresses',
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={openAddModal}
                        >
                            <Ionicons name="add" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <FlatList
                data={addressData}
                renderItem={renderAddress}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.addressList}
                ListEmptyComponent={renderEmptyState}
            />

            <AddressModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                address={editingAddress}
                onSave={handleSaveAddress}
                isEditing={isEditing}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    addButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.light.tint,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    addressList: {
        padding: 16,
        flexGrow: 1,
    },
    addressCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    defaultBadge: {
        backgroundColor: `${Colors.light.tint}20`,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    defaultText: {
        fontSize: 12,
        color: Colors.light.tint,
        fontWeight: '600',
    },
    addressActions: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    addressDetails: {
        marginBottom: 12,
    },
    addressText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 22,
    },
    defaultButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: Colors.light.tint,
        borderRadius: 6,
        marginTop: 8,
    },
    defaultButtonText: {
        fontSize: 14,
        color: Colors.light.tint,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        marginTop: 32,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
    },
}); 