import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}

interface SupportMethod {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
}

export default function HelpCenterScreen() {
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const faqCategories = [
        { id: 'all', name: 'All FAQs' },
        { id: 'ordering', name: 'Ordering' },
        { id: 'delivery', name: 'Delivery' },
        { id: 'account', name: 'Account' },
        { id: 'payment', name: 'Payment' },
    ];

    const faqs: FAQItem[] = [
        {
            id: '1',
            question: 'How do I place an order?',
            answer: 'You can place an order through our app by browsing the menu, selecting items, customizing them if needed, and proceeding to checkout. Follow the prompts to complete your order.',
            category: 'ordering',
        },
        {
            id: '2',
            question: 'How long will my delivery take?',
            answer: 'Delivery times typically range from 30-45 minutes, depending on your distance from our store, current order volume, and weather conditions. You can track your order in real-time through the app.',
            category: 'delivery',
        },
        {
            id: '3',
            question: 'How do I redeem a promo code?',
            answer: 'You can enter your promo code in the cart page before checkout. Look for the "Promo Code" field, enter your code, and tap "Apply" to receive your discount.',
            category: 'ordering',
        },
        {
            id: '4',
            question: 'What if my order is incorrect or missing items?',
            answer: 'We\'re sorry if this happens! Please contact our customer service team immediately through the app or by calling our hotline. We\'ll make it right as quickly as possible.',
            category: 'delivery',
        },
        {
            id: '5',
            question: 'How do I update my account information?',
            answer: 'You can update your personal information, addresses, and payment methods in the Profile tab. Tap on the respective section to make changes.',
            category: 'account',
        },
        {
            id: '6',
            question: 'Is my payment information secure?',
            answer: 'Yes, we use industry-standard encryption and security measures to protect your payment information. We never store your complete credit card details on our servers.',
            category: 'payment',
        },
        {
            id: '7',
            question: 'Can I schedule an order for later?',
            answer: 'Yes, you can schedule orders up to 7 days in advance. When checking out, select "Schedule for Later" and choose your preferred date and time.',
            category: 'ordering',
        },
        {
            id: '8',
            question: 'How do I track my order?',
            answer: 'Once your order is confirmed, you can track its status in real-time from the Orders tab. You\'ll see updates as your order is prepared, out for delivery, and arriving.',
            category: 'delivery',
        },
    ];

    const filteredFAQs = selectedCategory === 'all'
        ? faqs
        : faqs.filter(faq => faq.category === selectedCategory);

    const supportMethods: SupportMethod[] = [
        {
            id: '1',
            title: 'Live Chat',
            description: 'Chat with our support team in real-time',
            icon: <Ionicons name="chatbubble-ellipses" size={24} color={Colors.light.tint} />,
            action: () => {
                Alert.alert('Live Chat', 'Starting live chat with support...');
                // In a real app, this would open a chat interface
            },
        },
        {
            id: '2',
            title: 'Email Support',
            description: 'support@pizzahub.com',
            icon: <Ionicons name="mail" size={24} color={Colors.light.tint} />,
            action: () => {
                Linking.openURL('mailto:support@pizzahub.com');
            },
        },
        {
            id: '3',
            title: 'Call Us',
            description: '+1 (555) 123-4567',
            icon: <Ionicons name="call" size={24} color={Colors.light.tint} />,
            action: () => {
                Linking.openURL('tel:+15551234567');
            },
        },
        {
            id: '4',
            title: 'Report an Issue',
            description: 'Submit a problem with your order',
            icon: <MaterialIcons name="report-problem" size={24} color={Colors.light.tint} />,
            action: () => {
                Alert.alert('Report Issue', 'Opening issue reporting form...');
                // In a real app, this would navigate to a form
            },
        },
    ];

    const toggleFAQ = (id: string) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help Center</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.supportSection}>
                    <Text style={styles.sectionTitle}>How Can We Help?</Text>
                    <View style={styles.supportGrid}>
                        {supportMethods.map(method => (
                            <TouchableOpacity
                                key={method.id}
                                style={styles.supportItem}
                                onPress={method.action}
                            >
                                <View style={styles.supportIcon}>
                                    {method.icon}
                                </View>
                                <Text style={styles.supportTitle}>{method.title}</Text>
                                <Text style={styles.supportDescription}>{method.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.faqSection}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoriesContainer}
                    >
                        {faqCategories.map(category => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryItem,
                                    selectedCategory === category.id && styles.selectedCategory,
                                ]}
                                onPress={() => setSelectedCategory(category.id)}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory === category.id && styles.selectedCategoryText,
                                    ]}
                                >
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.faqList}>
                        {filteredFAQs.map(faq => (
                            <TouchableOpacity
                                key={faq.id}
                                style={styles.faqItem}
                                onPress={() => toggleFAQ(faq.id)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.faqQuestion}>
                                    <Text style={styles.questionText}>{faq.question}</Text>
                                    <Ionicons
                                        name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"}
                                        size={20}
                                        color="#666"
                                    />
                                </View>

                                {expandedFAQ === faq.id && (
                                    <View style={styles.faqAnswer}>
                                        <Text style={styles.answerText}>{faq.answer}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.additionalLinksSection}>
                    <Text style={styles.sectionTitle}>Additional Resources</Text>

                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => router.push('/profile/contact-us' as any)}
                    >
                        <View style={styles.linkContent}>
                            <Ionicons name="call" size={20} color={Colors.light.tint} style={styles.linkIcon} />
                            <Text style={styles.linkText}>Contact Us</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => router.push('/profile/terms-conditions' as any)}
                    >
                        <View style={styles.linkContent}>
                            <Ionicons name="document-text" size={20} color={Colors.light.tint} style={styles.linkIcon} />
                            <Text style={styles.linkText}>Terms & Conditions</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => router.push('/profile/privacy-policy' as any)}
                    >
                        <View style={styles.linkContent}>
                            <Ionicons name="shield" size={20} color={Colors.light.tint} style={styles.linkIcon} />
                            <Text style={styles.linkText}>Privacy Policy</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>
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
    supportSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    supportGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    supportItem: {
        width: '48%',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    supportIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    supportTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    supportDescription: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    faqSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
    },
    categoriesContainer: {
        marginBottom: 16,
    },
    categoryItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    selectedCategory: {
        backgroundColor: Colors.light.tint,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    faqList: {
        marginBottom: 16,
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
    },
    faqQuestion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        marginRight: 8,
    },
    faqAnswer: {
        marginTop: 8,
        paddingBottom: 8,
    },
    answerText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    additionalLinksSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 32,
    },
    linkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    linkContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkIcon: {
        marginRight: 12,
    },
    linkText: {
        fontSize: 16,
    },
}); 