import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PrivacyPolicyScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.lastUpdated}>Last Updated: June 15, 2023</Text>

                    <Text style={styles.introduction}>
                        Pizza Hub, Inc. ("Pizza Hub," "we," "us," or "our") is committed to protecting your privacy.
                        This Privacy Policy explains how your personal information is collected, used, and disclosed by
                        Pizza Hub when you use our mobile application (our "App") or our services. By accessing or using
                        our App, you signify that you have read, understood, and agree to our collection, storage, use,
                        and disclosure of your personal information as described in this Privacy Policy.
                    </Text>

                    <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                    <Text style={styles.subSectionTitle}>a. Information You Provide to Us</Text>
                    <Text style={styles.paragraph}>
                        We collect information you provide directly to us. For example, we collect information when you
                        create an account, update your profile, place an order, participate in a contest or promotion,
                        contact customer service, or otherwise communicate with us. The types of information we may collect
                        include:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Name, email address, phone number, and delivery address</Text>
                        <Text style={styles.bulletItem}>• Password and account login credentials</Text>
                        <Text style={styles.bulletItem}>• Payment information and transaction history</Text>
                        <Text style={styles.bulletItem}>• Order preferences and dietary restrictions</Text>
                        <Text style={styles.bulletItem}>• Feedback and survey responses</Text>
                        <Text style={styles.bulletItem}>• Communication preferences</Text>
                    </View>

                    <Text style={styles.subSectionTitle}>b. Information We Collect Automatically</Text>
                    <Text style={styles.paragraph}>
                        When you use our App, we automatically collect certain information, including:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Device information (e.g., device type, operating system, and browser type)</Text>
                        <Text style={styles.bulletItem}>• Log information (e.g., access times, pages viewed, and IP address)</Text>
                        <Text style={styles.bulletItem}>• Location information (with your permission)</Text>
                        <Text style={styles.bulletItem}>• App usage and interaction information</Text>
                    </View>

                    <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                    <Text style={styles.paragraph}>
                        We use the information we collect to:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Process and fulfill your orders</Text>
                        <Text style={styles.bulletItem}>• Create and maintain your account</Text>
                        <Text style={styles.bulletItem}>• Provide, maintain, and improve our services</Text>
                        <Text style={styles.bulletItem}>• Send you technical notices, updates, and support messages</Text>
                        <Text style={styles.bulletItem}>• Respond to your comments, questions, and customer service requests</Text>
                        <Text style={styles.bulletItem}>• Communicate with you about products, services, offers, and promotions</Text>
                        <Text style={styles.bulletItem}>• Monitor and analyze trends, usage, and activities</Text>
                        <Text style={styles.bulletItem}>• Detect, investigate, and prevent fraudulent transactions and other illegal activities</Text>
                        <Text style={styles.bulletItem}>• Personalize your experience</Text>
                    </View>

                    <Text style={styles.sectionTitle}>3. Sharing of Information</Text>
                    <Text style={styles.paragraph}>
                        We may share your information as follows:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• With vendors, service providers, and contractors who need access to such information to perform services for us</Text>
                        <Text style={styles.bulletItem}>• With our restaurant partners to fulfill your orders</Text>
                        <Text style={styles.bulletItem}>• In response to a request for information if we believe disclosure is in accordance with applicable law or regulation</Text>
                        <Text style={styles.bulletItem}>• If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Pizza Hub or others</Text>
                        <Text style={styles.bulletItem}>• In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</Text>
                        <Text style={styles.bulletItem}>• With your consent or at your direction</Text>
                    </View>

                    <Text style={styles.sectionTitle}>4. Your Choices</Text>
                    <Text style={styles.paragraph}>
                        You have several choices available when it comes to your information:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bulletItem}>• Account Information: You may update, correct, or delete your account information at any time by logging into your account or contacting us.</Text>
                        <Text style={styles.bulletItem}>• Location Information: You can prevent us from collecting location information by denying permission in your device settings.</Text>
                        <Text style={styles.bulletItem}>• Marketing Communications: You can opt out of receiving promotional communications from us by following the instructions in those communications.</Text>
                        <Text style={styles.bulletItem}>• Push Notifications: You can opt out of receiving push notifications through your device settings.</Text>
                    </View>

                    <Text style={styles.sectionTitle}>5. Data Retention</Text>
                    <Text style={styles.paragraph}>
                        We will retain your information for as long as your account is active or as needed to provide you
                        services, comply with our legal obligations, resolve disputes, and enforce our agreements.
                    </Text>

                    <Text style={styles.sectionTitle}>6. Data Security</Text>
                    <Text style={styles.paragraph}>
                        We take reasonable measures to help protect your personal information from loss, theft, misuse,
                        unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable,
                        and we cannot guarantee the security of our systems.
                    </Text>

                    <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
                    <Text style={styles.paragraph}>
                        Our App is not directed to children under 13, and we do not knowingly collect personal information from
                        children under 13. If we learn we have collected personal information from a child under 13, we will
                        delete that information.
                    </Text>

                    <Text style={styles.sectionTitle}>8. Your California Privacy Rights</Text>
                    <Text style={styles.paragraph}>
                        If you are a California resident, you may have additional rights under California law. For more information,
                        please contact us using the information below.
                    </Text>

                    <Text style={styles.sectionTitle}>9. Changes to this Privacy Policy</Text>
                    <Text style={styles.paragraph}>
                        We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising
                        the date at the top of the policy and, in some cases, we may provide you with additional notice.
                    </Text>

                    <Text style={styles.sectionTitle}>10. Contact Us</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions about this Privacy Policy, please contact us at:
                    </Text>
                    <Text style={styles.contactInfo}>
                        Pizza Hub, Inc.{'\n'}
                        Attn: Privacy Officer{'\n'}
                        123 Main Street{'\n'}
                        Anytown, USA 12345{'\n'}
                        privacy@pizzahub.com
                    </Text>

                    <TouchableOpacity onPress={() => Linking.openURL('mailto:privacy@pizzahub.com')}>
                        <Text style={styles.emailLink}>Email Privacy Officer</Text>
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
        marginTop: 24,
        marginBottom: 10,
        color: '#333',
    },
    subSectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
        color: '#333',
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 12,
        color: '#444',
    },
    bulletList: {
        marginBottom: 16,
    },
    bulletItem: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8,
        paddingLeft: 8,
        color: '#444',
    },
    contactInfo: {
        fontSize: 14,
        lineHeight: 22,
        marginTop: 8,
        marginBottom: 16,
        color: '#444',
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    emailLink: {
        fontSize: 15,
        color: Colors.light.tint,
        textDecorationLine: 'underline',
        marginTop: 8,
        alignSelf: 'flex-start',
    },
}); 