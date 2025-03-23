import React, { useState, useEffect } from 'react';
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
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/utils/auth/authContext';
import { Link, router } from 'expo-router';
import { useAppDispatch, useAppSelector, loginUser, clearError } from '@/app/redux';

export default function LoginScreen(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { loginWithGoogle, loginWithApple, loginWithFacebook } = useAuth();

    // Using Redux for authentication
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const { isLoading, error, isAuthenticated } = auth || {
        isLoading: false,
        error: null,
        isAuthenticated: false
    };

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/(tabs)');
        }
    }, [isAuthenticated]);

    const handleClearError = () => {
        dispatch(clearError());
    };

    const handleLogin = async (): Promise<void> => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            // Redux state will handle the navigation via useEffect
        } catch (err) {
            console.log('Login failed:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleGoogleLogin = async (): Promise<void> => {
        try {
            await loginWithGoogle();
            router.replace('/(tabs)');
        } catch (err) {
            console.log('Google login failed:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleAppleLogin = async (): Promise<void> => {
        try {
            await loginWithApple();
            router.replace('/(tabs)');
        } catch (err) {
            console.log('Apple login failed:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleFacebookLogin = async (): Promise<void> => {
        try {
            await loginWithFacebook();
            router.replace('/(tabs)');
        } catch (err) {
            console.log('Facebook login failed:', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const navigateToForgotPassword = (): void => {
        router.push('/auth/forgot-password');
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
                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Sign in to continue ordering your favorite pizza</Text>
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={handleClearError}>
                            <Ionicons name="close-circle" size={24} color={Colors.light.error} />
                        </TouchableOpacity>
                    </View>
                )}

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

                    <TouchableOpacity
                        style={styles.forgotPasswordButton}
                        onPress={navigateToForgotPassword}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.loginButton, isLoading && styles.disabledButton]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Text style={styles.loginButtonText}>Loading...</Text>
                        ) : (
                            <Text style={styles.loginButtonText}>Login</Text>
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
                        onPress={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        <Ionicons name="logo-google" size={24} color="#DB4437" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={handleAppleLogin}
                        disabled={isLoading}
                    >
                        <Ionicons name="logo-apple" size={24} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={handleFacebookLogin}
                        disabled={isLoading}
                    >
                        <Ionicons name="logo-facebook" size={24} color="#3b5998" />
                    </TouchableOpacity>
                </View>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <Link href="/auth/signup" asChild>
                        <TouchableOpacity>
                            <Text style={styles.signupLink}>Sign Up</Text>
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
        width: 120,
        height: 120,
        marginBottom: 24,
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
        marginBottom: 24,
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
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: Colors.light.tint,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 8,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        opacity: 0.7,
    },
    loginButtonText: {
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
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: '#666',
        fontSize: 14,
    },
    signupLink: {
        color: Colors.light.tint,
        fontSize: 14,
        fontWeight: 'bold',
    },
}); 