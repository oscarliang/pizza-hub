import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface Address {
    id?: string;
    label: string;
    street: string;
    apt?: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault?: boolean;
}

interface AddressModalProps {
    visible: boolean;
    onClose: () => void;
    address?: Address;
    onSave: (address: Address) => void;
    isEditing: boolean;
}

const DEFAULT_ADDRESS: Address = {
    label: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
};

const AddressModal: React.FC<AddressModalProps> = ({
    visible,
    onClose,
    address,
    onSave,
    isEditing,
}) => {
    const [formData, setFormData] = useState<Address>(DEFAULT_ADDRESS);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (visible) {
            setFormData(address || DEFAULT_ADDRESS);
            setErrors({});
        }
    }, [visible, address]);

    const handleChange = (field: keyof Address, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const validate = () => {
        let isValid = true;
        const newErrors: Record<string, string> = {};

        if (!formData.label.trim()) {
            newErrors.label = 'Address label is required';
            isValid = false;
        }

        if (!formData.street.trim()) {
            newErrors.street = 'Street address is required';
            isValid = false;
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
            isValid = false;
        }

        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
            isValid = false;
        }

        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'Zip code is required';
            isValid = false;
        } else {
            // Basic US zip code validation
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(formData.zipCode)) {
                newErrors.zipCode = 'Enter a valid zip code (e.g., 12345 or 12345-6789)';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
        if (validate()) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.centeredView}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {isEditing ? 'Edit Address' : 'Add New Address'}
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalContent}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Address Label</Text>
                            <TextInput
                                style={[styles.input, errors.label ? styles.inputError : null]}
                                value={formData.label}
                                onChangeText={(value) => handleChange('label', value)}
                                placeholder="Home, Work, etc."
                                placeholderTextColor="#999"
                            />
                            {errors.label ? <Text style={styles.errorText}>{errors.label}</Text> : null}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Street Address</Text>
                            <TextInput
                                style={[styles.input, errors.street ? styles.inputError : null]}
                                value={formData.street}
                                onChangeText={(value) => handleChange('street', value)}
                                placeholder="Street address"
                                placeholderTextColor="#999"
                            />
                            {errors.street ? <Text style={styles.errorText}>{errors.street}</Text> : null}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Apartment/Suite (Optional)</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.apt}
                                onChangeText={(value) => handleChange('apt', value)}
                                placeholder="Apt, Suite, Unit, etc."
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                style={[styles.input, errors.city ? styles.inputError : null]}
                                value={formData.city}
                                onChangeText={(value) => handleChange('city', value)}
                                placeholder="City"
                                placeholderTextColor="#999"
                            />
                            {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
                        </View>

                        <View style={styles.rowInputs}>
                            <View style={[styles.inputGroup, styles.stateInput]}>
                                <Text style={styles.label}>State</Text>
                                <TextInput
                                    style={[styles.input, errors.state ? styles.inputError : null]}
                                    value={formData.state}
                                    onChangeText={(value) => handleChange('state', value)}
                                    placeholder="State"
                                    placeholderTextColor="#999"
                                    maxLength={2}
                                    autoCapitalize="characters"
                                />
                                {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}
                            </View>

                            <View style={[styles.inputGroup, styles.zipInput]}>
                                <Text style={styles.label}>ZIP Code</Text>
                                <TextInput
                                    style={[styles.input, errors.zipCode ? styles.inputError : null]}
                                    value={formData.zipCode}
                                    onChangeText={(value) => handleChange('zipCode', value)}
                                    placeholder="ZIP Code"
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                />
                                {errors.zipCode ? <Text style={styles.errorText}>{errors.zipCode}</Text> : null}
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.defaultCheckbox}
                            onPress={() => handleChange('isDefault', !formData.isDefault)}
                        >
                            <View style={[
                                styles.checkbox,
                                formData.isDefault ? styles.checkboxChecked : null,
                            ]}>
                                {formData.isDefault && (
                                    <Ionicons name="checkmark" size={16} color="white" />
                                )}
                            </View>
                            <Text style={styles.checkboxLabel}>Set as default address</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save Address</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    modalContent: {
        padding: 16,
        maxHeight: '70%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    rowInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stateInput: {
        flex: 1,
        marginRight: 8,
    },
    zipInput: {
        flex: 2,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: '#f44336',
    },
    errorText: {
        color: '#f44336',
        fontSize: 14,
        marginTop: 4,
    },
    defaultCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: Colors.light.tint,
        borderColor: Colors.light.tint,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        minWidth: 100,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
    },
    saveButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: Colors.light.tint,
        minWidth: 140,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default AddressModal; 