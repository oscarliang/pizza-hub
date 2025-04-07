import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppSelector } from '@/app/redux';

// Mock data - in a real app this would come from the backend
interface PaymentMethod {
    id: string;
    cardBrand: string;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
}

export default function PaymentMethodsScreen() {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        {
            id: '1',
            cardBrand: 'visa',
            last4: '4242',
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true,
        },
        {
            id: '2',
            cardBrand: 'mastercard',
            last4: '5555',
            expiryMonth: 10,
            expiryYear: 2024,
            isDefault: false,
        },
    ]);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // New card form state
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [saveCard, setSaveCard] = useState(true);
    const [isDefault, setIsDefault] = useState(false);

    // Redux user state
    const user = useAppSelector((state) => state.user);

    const formatCardNumber = (text: string) => {
        // Remove all non-digit characters
        const cleaned = text.replace(/\D/g, '');
        // Format with spaces every 4 digits
        const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
        return formatted.substring(0, 19); // Limit to 16 digits plus spaces
    };

    const formatExpiryDate = (text: string) => {
        // Remove all non-digit characters
        const cleaned = text.replace(/\D/g, '');
        // Format as MM/YY
        if (cleaned.length > 2) {
            return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
        }
        return cleaned;
    };

    const handleCardNumberChange = (text: string) => {
        setCardNumber(formatCardNumber(text));
    };

    const handleExpiryDateChange = (text: string) => {
        setExpiryDate(formatExpiryDate(text));
    };

    const handleCvvChange = (text: string) => {
        // Allow only digits and limit to 3-4 characters
        const cleaned = text.replace(/\D/g, '');
        setCvv(cleaned.substring(0, 4));
    };

    const validateCard = () => {
        if (cardNumber.replace(/\s/g, '').length < 16) {
            Alert.alert('Invalid Card', 'Please enter a valid card number');
            return false;
        }

        if (expiryDate.length < 5) {
            Alert.alert('Invalid Expiry Date', 'Please enter a valid expiry date (MM/YY)');
            return false;
        }

        // Validate expiry date
        const [month, year] = expiryDate.split('/');
        const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of year
        const currentMonth = new Date().getMonth() + 1; // January is 0

        if (
            parseInt(month) < 1 ||
            parseInt(month) > 12 ||
            parseInt(year) < currentYear ||
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)
        ) {
            Alert.alert('Invalid Expiry Date', 'The card has expired or the date is invalid');
            return false;
        }

        if (cvv.length < 3) {
            Alert.alert('Invalid CVV', 'Please enter a valid security code');
            return false;
        }

        if (!cardholderName.trim()) {
            Alert.alert('Invalid Name', 'Please enter the cardholder name');
            return false;
        }

        return true;
    };

    const addCard = async () => {
        if (!validateCard()) return;

        setIsLoading(true);

        try {
            // In a real app, this would make an API call to your backend,
            // which would then use Stripe API to create a payment method
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

            // Mock successful card addition
            const newCard: PaymentMethod = {
                id: `card_${Date.now()}`,
                cardBrand: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
                last4: cardNumber.replace(/\s/g, '').slice(-4),
                expiryMonth: parseInt(expiryDate.split('/')[0]),
                expiryYear: 2000 + parseInt(expiryDate.split('/')[1]),
                isDefault: isDefault || paymentMethods.length === 0,
            };

            // If setting this card as default, update other cards
            let updatedPaymentMethods = [...paymentMethods];
            if (newCard.isDefault) {
                updatedPaymentMethods = updatedPaymentMethods.map(method => ({
                    ...method,
                    isDefault: false,
                }));
            }

            // Add the new card
            setPaymentMethods([...updatedPaymentMethods, newCard]);

            // Reset form
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
            setCardholderName('');
            setIsDefault(false);
            setIsAddingCard(false);

            Alert.alert('Success', 'Your card has been added successfully.');
        } catch (error) {
            Alert.alert('Error', 'There was a problem adding your card. Please try again.');
            console.error('Error adding card:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setDefaultCard = (id: string) => {
        setPaymentMethods(
            paymentMethods.map(method => ({
                ...method,
                isDefault: method.id === id,
            }))
        );
    };

    const deleteCard = (id: string) => {
        Alert.alert(
            'Delete Card',
            'Are you sure you want to delete this card?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const methodToDelete = paymentMethods.find(method => method.id === id);
                        setPaymentMethods(paymentMethods.filter(method => method.id !== id));

                        // If deleted the default card, set a new default
                        if (methodToDelete?.isDefault && paymentMethods.length > 1) {
                            const remainingMethods = paymentMethods.filter(method => method.id !== id);
                            setDefaultCard(remainingMethods[0].id);
                        }
                    }
                },
            ]
        );
    };

    const getCardIcon = (brand: string) => {
        switch (brand.toLowerCase()) {
            case 'visa':
                return <FontAwesome name="cc-visa" size={28} color="#1A1F71" />;
            case 'mastercard':
                return <FontAwesome name="cc-mastercard" size={28} color="#EB001B" />;
            case 'amex':
                return <FontAwesome name="cc-amex" size={28} color="#006FCF" />;
            case 'discover':
                return <FontAwesome name="cc-discover" size={28} color="#FF6600" />;
            default:
                return <FontAwesome name="credit-card" size={28} color="#666" />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Methods</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                {paymentMethods.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Saved Cards</Text>
                        {paymentMethods.map(method => (
                            <View key={method.id} style={styles.cardItem}>
                                <View style={styles.cardInfo}>
                                    {getCardIcon(method.cardBrand)}
                                    <View style={styles.cardDetails}>
                                        <Text style={styles.cardNumber}>
                                            •••• •••• •••• {method.last4}
                                        </Text>
                                        <Text style={styles.cardExpiry}>
                                            Expires {String(method.expiryMonth).padStart(2, '0')}/{method.expiryYear}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.cardActions}>
                                    {method.isDefault ? (
                                        <View style={styles.defaultBadge}>
                                            <Text style={styles.defaultText}>Default</Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            style={styles.setDefaultButton}
                                            onPress={() => setDefaultCard(method.id)}
                                        >
                                            <Text style={styles.setDefaultText}>Set as Default</Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => deleteCard(method.id)}
                                    >
                                        <Ionicons name="trash-outline" size={20} color="#ff3b30" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="card-outline" size={60} color="#ccc" />
                        <Text style={styles.emptyStateText}>No payment methods added yet</Text>
                    </View>
                )}

                {isAddingCard ? (
                    <View style={styles.formSection}>
                        <View style={styles.sectionTitleRow}>
                            <Text style={styles.sectionTitle}>Add New Card</Text>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setIsAddingCard(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Card Number</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome name="credit-card" size={20} color="#999" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="1234 5678 9012 3456"
                                    placeholderTextColor="#999"
                                    keyboardType="number-pad"
                                    value={cardNumber}
                                    onChangeText={handleCardNumberChange}
                                    maxLength={19}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                                <Text style={styles.label}>Expiry Date</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="MM/YY"
                                    placeholderTextColor="#999"
                                    keyboardType="number-pad"
                                    value={expiryDate}
                                    onChangeText={handleExpiryDateChange}
                                    maxLength={5}
                                />
                            </View>

                            <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
                                <Text style={styles.label}>CVV</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="123"
                                    placeholderTextColor="#999"
                                    keyboardType="number-pad"
                                    value={cvv}
                                    onChangeText={handleCvvChange}
                                    maxLength={4}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Cardholder Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                placeholderTextColor="#999"
                                value={cardholderName}
                                onChangeText={setCardholderName}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={styles.checkboxRow}>
                            <TouchableOpacity
                                style={styles.checkbox}
                                onPress={() => setSaveCard(!saveCard)}
                            >
                                {saveCard && <Ionicons name="checkmark" size={18} color={Colors.light.tint} />}
                            </TouchableOpacity>
                            <Text style={styles.checkboxLabel}>Save this card for future payments</Text>
                        </View>

                        <View style={styles.checkboxRow}>
                            <TouchableOpacity
                                style={styles.checkbox}
                                onPress={() => setIsDefault(!isDefault)}
                            >
                                {isDefault && <Ionicons name="checkmark" size={18} color={Colors.light.tint} />}
                            </TouchableOpacity>
                            <Text style={styles.checkboxLabel}>Set as default payment method</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.addButton, isLoading && styles.disabledButton]}
                            onPress={addCard}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.addButtonText}>Add Card</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.secureInfo}>
                            <Ionicons name="lock-closed" size={16} color="#999" />
                            <Text style={styles.secureText}>
                                Your payment information is securely processed by Stripe
                            </Text>
                        </View>

                        <View style={styles.cardsAccepted}>
                            <Text style={styles.cardsAcceptedText}>We accept:</Text>
                            <View style={styles.cardIcons}>
                                <FontAwesome name="cc-visa" size={28} color="#1A1F71" style={styles.cardIcon} />
                                <FontAwesome name="cc-mastercard" size={28} color="#EB001B" style={styles.cardIcon} />
                                <FontAwesome name="cc-amex" size={28} color="#006FCF" style={styles.cardIcon} />
                                <FontAwesome name="cc-discover" size={28} color="#FF6600" style={styles.cardIcon} />
                            </View>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.addCardButton}
                        onPress={() => setIsAddingCard(true)}
                    >
                        <Ionicons name="add-circle-outline" size={20} color={Colors.light.tint} />
                        <Text style={styles.addCardText}>Add New Payment Method</Text>
                    </TouchableOpacity>
                )}
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
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cancelButton: {
        padding: 5,
    },
    cancelButtonText: {
        color: Colors.light.tint,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
    },
    emptyStateText: {
        marginTop: 16,
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    cardItem: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardDetails: {
        marginLeft: 12,
    },
    cardNumber: {
        fontSize: 16,
        fontWeight: '500',
    },
    cardExpiry: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    setDefaultButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    setDefaultText: {
        color: Colors.light.tint,
        fontWeight: '500',
    },
    defaultBadge: {
        backgroundColor: Colors.light.tint + '20',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    defaultText: {
        color: Colors.light.tint,
        fontWeight: '500',
        fontSize: 12,
    },
    deleteButton: {
        padding: 8,
    },
    addCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    addCardText: {
        color: Colors.light.tint,
        fontWeight: '500',
        marginLeft: 8,
    },
    formSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 16,
    },
    formRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    inputIcon: {
        marginHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 48,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
    addButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    disabledButton: {
        opacity: 0.7,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secureInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    secureText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
    },
    cardsAccepted: {
        marginTop: 16,
        alignItems: 'center',
    },
    cardsAcceptedText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
    },
    cardIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardIcon: {
        marginHorizontal: 8,
    },
}); 