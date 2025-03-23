import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { getImage } from '@/constants/ImagePlaceholders';
import { useRouter } from 'expo-router';
import {
    useAppDispatch,
    useAppSelector,
    setNotificationSettings,
    fetchUserProfile,
    logoutUser
} from '@/app/redux';
import PersonalInfoModal from '@/components/PersonalInfoModal';

export default function ProfileScreen() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Get user data from Redux store
    const user = useAppSelector((state) => state.user);
    const { name, email, notificationSettings, isLoading } = user || {
        notificationSettings: { pushEnabled: true, specialOffersEnabled: true }
    };
    const { pushEnabled, specialOffersEnabled } = notificationSettings;

    const [personalInfoModalVisible, setPersonalInfoModalVisible] = useState(false);

    // Fetch user profile on component mount
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    // Handle notification toggles
    const handlePushNotificationToggle = (value: boolean) => {
        dispatch(setNotificationSettings({ pushEnabled: value }));
    };

    const handleSpecialOffersToggle = (value: boolean) => {
        dispatch(setNotificationSettings({ specialOffersEnabled: value }));
    };

    const handleLogout = async () => {
        // Dispatch logout action
        await dispatch(logoutUser());
        // Redirect to login page
        router.replace('/auth/login');
    };

    const handleSavePersonalInfo = (data: { name: string; email: string; phone?: string }) => {
        // This would dispatch an action to update user profile
        console.log('Updating user info:', data);
    };

    const navigateToAddresses = () => {
        router.push('/profile/addresses' as any);
    };

    const navigateToPaymentMethods = () => {
        // Not implemented yet - will create this page later
        // router.push('/profile/payment-methods');
        console.log('Payment methods not implemented yet');
    };

    const navigateToFavoriteOrders = () => {
        // Not implemented yet - will create this page later
        // router.push('/profile/favorite-orders');
        console.log('Favorite orders not implemented yet');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userInfoContainer}>
                    <Image
                        source={getImage('profile-avatar')}
                        style={styles.avatar}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{name || 'John Doe'}</Text>
                        <Text style={styles.userEmail}>{email || 'john.doe@example.com'}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setPersonalInfoModalVisible(true)}
                    >
                        <Ionicons name="pencil" size={20} color={Colors.light.tint} />
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text>Loading profile...</Text>
                </View>
            ) : (
                <ScrollView style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account</Text>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => setPersonalInfoModalVisible(true)}
                        >
                            <View style={styles.menuItemIcon}>
                                <Ionicons name="person" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.menuItemText}>Personal Information</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={navigateToAddresses}
                        >
                            <View style={styles.menuItemIcon}>
                                <Ionicons name="location" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.menuItemText}>Saved Addresses</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={navigateToPaymentMethods}
                        >
                            <View style={styles.menuItemIcon}>
                                <Ionicons name="card" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.menuItemText}>Payment Methods</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={navigateToFavoriteOrders}
                        >
                            <View style={styles.menuItemIcon}>
                                <FontAwesome5 name="pizza-slice" size={20} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.menuItemText}>Favorite Orders</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Notifications</Text>

                        <View style={styles.toggleItem}>
                            <View style={styles.toggleItemIcon}>
                                <Ionicons name="notifications" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.toggleItemText}>Push Notifications</Text>
                            <Switch
                                value={pushEnabled}
                                onValueChange={handlePushNotificationToggle}
                                trackColor={{ false: '#e0e0e0', true: `${Colors.light.tint}80` }}
                                thumbColor={pushEnabled ? Colors.light.tint : '#f4f3f4'}
                            />
                        </View>

                        <View style={styles.toggleItem}>
                            <View style={styles.toggleItemIcon}>
                                <Ionicons name="pricetag" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.toggleItemText}>Special Offers & Promotions</Text>
                            <Switch
                                value={specialOffersEnabled}
                                onValueChange={handleSpecialOffersToggle}
                                trackColor={{ false: '#e0e0e0', true: `${Colors.light.tint}80` }}
                                thumbColor={specialOffersEnabled ? Colors.light.tint : '#f4f3f4'}
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Support</Text>

                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemIcon}>
                                <Ionicons name="help-circle" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.menuItemText}>Help Center</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemIcon}>
                                <MaterialIcons name="chat" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.menuItemText}>Contact Us</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemIcon}>
                                <Ionicons name="document-text" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.menuItemText}>Terms & Conditions</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemIcon}>
                                <Ionicons name="shield" size={22} color={Colors.light.tint} />
                            </View>
                            <Text style={styles.menuItemText}>Privacy Policy</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out" size={20} color="#fff" style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>

                    <Text style={styles.versionText}>Version 1.0.0</Text>
                </ScrollView>
            )}

            {/* Modals */}
            <PersonalInfoModal
                visible={personalInfoModalVisible}
                onClose={() => setPersonalInfoModalVisible(false)}
                userData={{
                    id: user?.id || '1',
                    name: name || 'John Doe',
                    email: email || 'john.doe@example.com',
                    phone: '',
                }}
                onSave={handleSavePersonalInfo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#eee',
    },
    userInfo: {
        marginLeft: 16,
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    editButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    menuItemIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: `${Colors.light.tint}10`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuItemText: {
        flex: 1,
        fontSize: 16,
    },
    toggleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    toggleItemIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: `${Colors.light.tint}10`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    toggleItemText: {
        flex: 1,
        fontSize: 16,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
    },
    logoutIcon: {
        marginRight: 8,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    versionText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 12,
        marginBottom: 24,
    },
}); 