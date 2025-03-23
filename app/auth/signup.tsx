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
import { Link, router } from 'expo-router';

export default function SignupScreen(): JSX.Element {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, loginWithGoogle, loginWithApple, loginWithFacebook, loading, error, clearError } = useAuth();

    const validateForm = (): boolean => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter your name');
            return false;
        }
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return false;
        }
        if (!password) {
            Alert.alert('Error', 'Please enter a password');
            return false;
        }
        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSignup = async (): Promise<void> => {
        if (!validateForm()) return;

        try {
            await register(email, password, name, phone);
            router.replace('/(tabs)');
        } catch (err) {
            // Error is already handled in the auth context
            console.log('Signup failed:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleGoogleSignup = async (): Promise<void> => {
        try {
            await loginWithGoogle();
            router.replace('/(tabs)');
        } catch (err) {
            console.log('Google signup failed:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleAppleSignup = async (): Promise<void> => {
        try {
            await loginWithApple();
            router.replace('/(tabs)');
        } catch (err) {
            console.log('Apple signup failed:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleFacebookSignup = async (): Promise<void> => {
        try {
            await loginWithFacebook();
            router.replace('/(tabs)');
        } catch (err) {
            console.log('Facebook signup failed:', err instanceof Error ? err.message : 'Unknown error');
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
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to start ordering delicious pizza</Text>
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={clearError}>
                            <Ionicons name="close-circle" size={24} color={Colors.light.error} />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person" size={20} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#999"
                        />
                    </View>

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

                    <View style={styles.inputContainer}>
                        <Ionicons name="call" size={20} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number (Optional)"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed" size={20} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity
                            style={styles.passwordVisibilityButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color="#999"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed" size={20} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.signupButton, loading && styles.disabledButton]}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        {loading ? (
                            <Text style={styles.signupButtonText}>Loading...</Text>
                        ) : (
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.separator}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>OR CONTINUE WITH</Text>
                    <View style={styles.separatorLine} />
                </View>

                <View style={styles.socialButtons}>
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={handleGoogleSignup}
                        disabled={loading}
                    >
                        <Ionicons name="logo-google" size={24} color="#DB4437" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={handleAppleSignup}
                        disabled={loading}
                    >
                        <Ionicons name="logo-apple" size={24} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={handleFacebookSignup}
                        disabled={loading}
                    >
                        <Ionicons name="logo-facebook" size={24} color="#3b5998" />
                    </TouchableOpacity>
                </View>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <Link href="/auth/login" asChild>
                        <TouchableOpacity>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                <Text style={styles.termsText}>
                    By signing up, you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
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
        marginBottom: 32,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
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
        marginBottom: 16,
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
    passwordVisibilityButton: {
        padding: 8,
    },
    signupButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    disabledButton: {
        opacity: 0.7,
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    separatorText: {
        color: '#999',
        fontSize: 12,
        marginHorizontal: 8,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 32,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: Colors.light.tint,
        fontSize: 14,
        fontWeight: 'bold',
    },
    termsText: {
        color: '#666',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
    },
    termsLink: {
        color: Colors.light.tint,
        fontWeight: '500',
    },
}); 