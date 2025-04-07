import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TermsConditionsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Conditions</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.lastUpdated}>Last Updated: June 15, 2023</Text>

                    <Text style={styles.introduction}>
                        Please read these Terms and Conditions ("Terms") carefully before using the Pizza Hub mobile
                        application operated by Pizza Hub, Inc. Your access to and use of the service is conditioned on
                        your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and
                        others who access or use the Service.
                    </Text>

                    <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                    <Text style={styles.paragraph}>
                        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any
                        part of the terms, then you may not access the Service. Your continued use of the application
                        following the posting of any changes to the Terms constitutes acceptance of those changes.
                    </Text>

                    <Text style={styles.sectionTitle}>2. Account Registration</Text>
                    <Text style={styles.paragraph}>
                        When you create an account with us, you must provide information that is accurate, complete, and
                        current at all times. Failure to do so constitutes a breach of the Terms, which may result in
                        immediate termination of your account on our Service.
                    </Text>
                    <Text style={styles.paragraph}>
                        You are responsible for safeguarding the password that you use to access the Service and for any
                        activities or actions under your password. You agree not to disclose your password to any third
                        party. You must notify us immediately upon becoming aware of any breach of security or unauthorized
                        use of your account.
                    </Text>

                    <Text style={styles.sectionTitle}>3. Ordering & Payment</Text>
                    <Text style={styles.paragraph}>
                        All orders placed through the Service are subject to acceptance and availability. We reserve the
                        right to refuse service, limit order quantity, or cancel orders at our sole discretion.
                    </Text>
                    <Text style={styles.paragraph}>
                        Prices for products are subject to change without notice. We reserve the right at any time to
                        modify or discontinue the Service without notice at any time.
                    </Text>
                    <Text style={styles.paragraph}>
                        We shall not be liable to you or to any third-party for any modification, price change, suspension,
                        or discontinuance of the Service.
                    </Text>

                    <Text style={styles.sectionTitle}>4. Delivery</Text>
                    <Text style={styles.paragraph}>
                        Pizza Hub strives to ensure timely delivery of your order. However, delivery times are estimates
                        and may be affected by factors beyond our control, such as weather, traffic, and order volume. We
                        cannot guarantee delivery times.
                    </Text>
                    <Text style={styles.paragraph}>
                        Delivery areas are limited to ensure quality and freshness of food. We reserve the right to limit
                        delivery areas based on distance, location safety, or other factors.
                    </Text>

                    <Text style={styles.sectionTitle}>5. Promotions and Discounts</Text>
                    <Text style={styles.paragraph}>
                        Pizza Hub may offer promotions and discounts through the Service. All promotions and discounts are
                        subject to their specific terms and conditions, including expiration dates and usage limitations.
                    </Text>
                    <Text style={styles.paragraph}>
                        We reserve the right to modify or cancel any promotion or discount at any time. Promotions and
                        discounts cannot be combined unless specifically stated otherwise.
                    </Text>

                    <Text style={styles.sectionTitle}>6. User Content</Text>
                    <Text style={styles.paragraph}>
                        Our Service allows you to post, link, store, share and otherwise make available certain information,
                        text, graphics, or other material ("User Content"). You are responsible for the User Content that
                        you post to the Service, including its legality, reliability, and appropriateness.
                    </Text>
                    <Text style={styles.paragraph}>
                        By posting User Content to the Service, you grant us the right and license to use, modify, perform,
                        display, reproduce, and distribute such content on and through the Service. You retain any and all of
                        your rights to any User Content you submit, post, or display on or through the Service.
                    </Text>

                    <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
                    <Text style={styles.paragraph}>
                        The Service and its original content (excluding User Content), features, and functionality are and
                        will remain the exclusive property of Pizza Hub and its licensors. The Service is protected by
                        copyright, trademark, and other laws of both the United States and foreign countries.
                    </Text>
                    <Text style={styles.paragraph}>
                        Our trademarks and trade dress may not be used in connection with any product or service without the
                        prior written consent of Pizza Hub.
                    </Text>

                    <Text style={styles.sectionTitle}>8. Termination</Text>
                    <Text style={styles.paragraph}>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any
                        reason whatsoever, including without limitation if you breach the Terms. Upon termination, your
                        right to use the Service will immediately cease.
                    </Text>

                    <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
                    <Text style={styles.paragraph}>
                        In no event shall Pizza Hub, nor its directors, employees, partners, agents, suppliers, or affiliates,
                        be liable for any indirect, incidental, special, consequential or punitive damages, including without
                        limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your
                        access to or use of or inability to access or use the Service.
                    </Text>

                    <Text style={styles.sectionTitle}>10. Governing Law</Text>
                    <Text style={styles.paragraph}>
                        These Terms shall be governed and construed in accordance with the laws of the United States, without
                        regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms
                        will not be considered a waiver of those rights.
                    </Text>

                    <Text style={styles.sectionTitle}>11. Changes to Terms</Text>
                    <Text style={styles.paragraph}>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                        revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
                        effect. What constitutes a material change will be determined at our sole discretion.
                    </Text>

                    <Text style={styles.sectionTitle}>12. Contact Us</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions about these Terms, please contact us at legal@pizzahub.com.
                    </Text>
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
    section: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
    },
    lastUpdated: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    introduction: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 24,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 16,
        color: '#444',
    },
}); 