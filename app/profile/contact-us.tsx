import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput, Alert } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ContactMethod {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
}

export default function ContactUsScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const contactMethods: ContactMethod[] = [
        {
            id: '1',
            title: 'Call Us',
            description: 'Available 9am-10pm daily',
            icon: <Ionicons name="call" size={24} color={Colors.light.tint} />,
            action: () => {
                Linking.openURL('tel:+15551234567');
            },
        },
        {
            id: '2',
            title: 'Email',
            description: 'Response within 24 hours',
            icon: <Ionicons name="mail" size={24} color={Colors.light.tint} />,
            action: () => {
                Linking.openURL('mailto:contact@pizzahub.com');
            },
        },
        {
            id: '3',
            title: 'Live Chat',
            description: 'Instant support',
            icon: <Ionicons name="chatbubble-ellipses" size={24} color={Colors.light.tint} />,
            action: () => {
                Alert.alert('Live Chat', 'Starting live chat with our support team...');
                // In a real app, this would launch a chat interface
            },
        },
        {
            id: '4',
            title: 'Visit Us',
            description: 'Find a location near you',
            icon: <Ionicons name="location" size={24} color={Colors.light.tint} />,
            action: () => {
                Alert.alert('Store Locator', 'Opening store locator...');
                // In a real app, this would navigate to a store locator
            },
        },
    ];

    const socialMediaLinks = [
        {
            id: '1',
            name: 'Facebook',
            icon: <FontAwesome name="facebook-square" size={28} color="#3b5998" />,
            url: 'https://facebook.com/pizzahub',
        },
        {
            id: '2',
            name: 'Twitter',
            icon: <FontAwesome name="twitter-square" size={28} color="#1da1f2" />,
            url: 'https://twitter.com/pizzahub',
        },
        {
            id: '3',
            name: 'Instagram',
            icon: <FontAwesome name="instagram" size={28} color="#c13584" />,
            url: 'https://instagram.com/pizzahub',
        },
        {
            id: '4',
            name: 'YouTube',
            icon: <FontAwesome name="youtube-play" size={28} color="#ff0000" />,
            url: 'https://youtube.com/pizzahub',
        },
    ];

    const sendMessage = () => {
        // Validate fields
        if (!name.trim() || !email.trim() || !message.trim()) {
            Alert.alert('Missing Information', 'Please fill in all required fields.');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        // Show loading
        setSending(true);

        // Mock API call delay
        setTimeout(() => {
            setSending(false);
            Alert.alert(
                'Message Sent',
                'Thank you for contacting Pizza Hub. We will get back to you shortly.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Clear the form
                            setName('');
                            setEmail('');
                            setSubject('');
                            setMessage('');
                        },
                    },
                ]
            );
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Us</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.contactMethodsSection}>
                    <Text style={styles.sectionTitle}>Get in Touch</Text>
                    <View style={styles.contactMethodsGrid}>
                        {contactMethods.map(method => (
                            <TouchableOpacity
                                key={method.id}
                                style={styles.contactMethodItem}
                                onPress={method.action}
                            >
                                <View style={styles.contactMethodIcon}>
                                    {method.icon}
                                </View>
                                <Text style={styles.contactMethodTitle}>{method.title}</Text>
                                <Text style={styles.contactMethodDescription}>{method.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Send a Message</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Full Name *</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your full name"
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Email Address *</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email address"
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Subject</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={setSubject}
                            placeholder="What's this regarding?"
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Message *</Text>
                        <TextInput
                            style={[styles.input, styles.messageInput]}
                            value={message}
                            onChangeText={setMessage}
                            placeholder="How can we help you?"
                            placeholderTextColor="#aaa"
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.sendButton, sending && styles.sendingButton]}
                        onPress={sendMessage}
                        disabled={sending}
                    >
                        <Text style={styles.sendButtonText}>
                            {sending ? 'Sending...' : 'Send Message'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.socialMediaSection}>
                    <Text style={styles.sectionTitle}>Follow Us</Text>
                    <View style={styles.socialMediaLinks}>
                        {socialMediaLinks.map(socialLink => (
                            <TouchableOpacity
                                key={socialLink.id}
                                style={styles.socialMediaItem}
                                onPress={() => Linking.openURL(socialLink.url)}
                            >
                                {socialLink.icon}
                                <Text style={styles.socialMediaName}>{socialLink.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.businessHoursSection}>
                    <Text style={styles.sectionTitle}>Business Hours</Text>
                    <View style={styles.businessHoursContent}>
                        <View style={styles.businessHoursRow}>
                            <Text style={styles.dayText}>Monday - Thursday</Text>
                            <Text style={styles.hoursText}>11:00 AM - 10:00 PM</Text>
                        </View>
                        <View style={styles.businessHoursRow}>
                            <Text style={styles.dayText}>Friday - Saturday</Text>
                            <Text style={styles.hoursText}>11:00 AM - 11:00 PM</Text>
                        </View>
                        <View style={styles.businessHoursRow}>
                            <Text style={styles.dayText}>Sunday</Text>
                            <Text style={styles.hoursText}>12:00 PM - 9:00 PM</Text>
                        </View>
                    </View>
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
    contactMethodsSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    contactMethodsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    contactMethodItem: {
        width: '48%',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    contactMethodIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    contactMethodTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    contactMethodDescription: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    formSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
    messageInput: {
        height: 120,
    },
    sendButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    sendingButton: {
        opacity: 0.7,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    socialMediaSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
    },
    socialMediaLinks: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    socialMediaItem: {
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 16,
    },
    socialMediaName: {
        marginTop: 8,
        fontSize: 14,
    },
    businessHoursSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 32,
    },
    businessHoursContent: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
    },
    businessHoursRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dayText: {
        fontSize: 15,
        fontWeight: '500',
    },
    hoursText: {
        fontSize: 15,
        color: '#666',
    },
}); 