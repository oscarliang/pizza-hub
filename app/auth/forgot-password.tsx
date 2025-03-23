import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/utils/auth/authContext';
import { router, Link } from 'expo-router';

export default function ForgotPasswordScreen(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { forgotPassword, loading, error, clearError } = useAuth();

    const handleSubmit = async (): Promise<void> => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            // Error is already handled in the auth context
            console.log('Password reset request failed:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        {submitted
                            ? "We've sent password reset instructions to your email"
                            : "Enter your email address and we'll send you instructions to reset your password"}
                    </Text>
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={clearError}>
                            <Ionicons name="close-circle" size={24} color={Colors.light.error} />
                        </TouchableOpacity>
                    </View>
                )}

                {!submitted ? (
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.submitButton, loading && styles.disabledButton]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <Text style={styles.submitButtonText}>Loading...</Text>
                            ) : (
                                <Text style={styles.submitButtonText}>Reset Password</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.successContainer}>
                        <View style={styles.successIconContainer}>
                            <Ionicons name="checkmark-circle" size={64} color={Colors.light.tint} />
                        </View>
                        <Text style={styles.successText}>
                            Please check your email for instructions to reset your password.
                        </Text>
                        <Text style={styles.successSubtext}>
                            If you don't see the email in your inbox, please check your spam folder.
                        </Text>
                    </View>
                )}

                <View style={styles.backContainer}>
                    <Link href="/auth/login" asChild>
                        <TouchableOpacity style={styles.backButton}>
                            <Ionicons name="arrow-back" size={20} color={Colors.light.tint} style={styles.backIcon} />
                            <Text style={styles.backText}>Back to Login</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `${Colors.light.error}15`,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        color: Colors.light.error,
        flex: 1,
        marginRight: 8,
    },
    form: {
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 24,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    submitButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    backIcon: {
        marginRight: 8,
    },
    backText: {
        color: Colors.light.tint,
        fontSize: 16,
        fontWeight: '500',
    },
    successContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
        padding: 24,
        backgroundColor: `${Colors.light.tint}08`,
        borderRadius: 12,
    },
    successIconContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: `${Colors.light.tint}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    successText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8,
    },
    successSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
}); 