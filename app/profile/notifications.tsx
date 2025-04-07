import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { ThemedView as View } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/app/redux';

interface Notification {
    id: string;
    title: string;
    body: string;
    date: string;
    type: 'order' | 'promotion' | 'account' | 'delivery';
    read: boolean;
    actionable: boolean;
    actionUrl?: string;
}

export default function NotificationsScreen() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    // Mock notifications - in a real app, these would come from a backend API
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'Your order is on the way!',
            body: 'Your order #12345 has been picked up by our delivery partner and is on the way to you.',
            date: '2023-06-10T14:30:00Z',
            type: 'delivery',
            read: false,
            actionable: true,
            actionUrl: '/track-order?id=12345',
        },
        {
            id: '2',
            title: 'Weekend Special: 40% Off!',
            body: 'Get 40% off on all large pizzas this weekend. Use code WEEKEND40 at checkout.',
            date: '2023-06-09T10:00:00Z',
            type: 'promotion',
            read: true,
            actionable: true,
            actionUrl: '/deal-detail?id=4',
        },
        {
            id: '3',
            title: 'New Veggie Supreme Pizza',
            body: 'Try our new Veggie Supreme Pizza loaded with fresh vegetables and our special sauce!',
            date: '2023-06-05T09:15:00Z',
            type: 'promotion',
            read: true,
            actionable: true,
            actionUrl: '/product-detail?id=6',
        },
        {
            id: '4',
            title: 'Your order has been delivered',
            body: 'Your order #12344 has been delivered. Enjoy your meal!',
            date: '2023-06-01T19:45:00Z',
            type: 'order',
            read: true,
            actionable: false,
        },
        {
            id: '5',
            title: 'Profile Updated',
            body: 'Your profile information has been successfully updated.',
            date: '2023-05-28T15:20:00Z',
            type: 'account',
            read: true,
            actionable: false,
        },
    ]);

    // Select notifications to show based on user preferences
    const filteredNotifications = notifications.filter(notification => {
        if (notification.type === 'promotion' && !user?.notificationSettings?.specialOffersEnabled) {
            return false;
        }
        return true;
    });

    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
    const displayNotifications = activeTab === 'all'
        ? filteredNotifications
        : filteredNotifications.filter(n => !n.read);

    const markAsRead = (id: string) => {
        setNotifications(
            notifications.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        if (filteredNotifications.some(n => !n.read)) {
            setNotifications(
                notifications.map(notification => ({ ...notification, read: true }))
            );
            Alert.alert('Success', 'All notifications marked as read');
        }
    };

    const deleteNotification = (id: string) => {
        Alert.alert(
            'Delete Notification',
            'Are you sure you want to delete this notification?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setNotifications(notifications.filter(notification => notification.id !== id));
                    }
                },
            ]
        );
    };

    const clearAllNotifications = () => {
        Alert.alert(
            'Clear All Notifications',
            'Are you sure you want to delete all notifications?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: () => {
                        setNotifications([]);
                    }
                },
            ]
        );
    };

    const handleNotificationPress = (notification: Notification) => {
        // Mark as read when tapped
        if (!notification.read) {
            markAsRead(notification.id);
        }

        // Navigate if actionable
        if (notification.actionable && notification.actionUrl) {
            router.push(notification.actionUrl as any);
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'order':
                return <Ionicons name="receipt" size={24} color="#4caf50" />;
            case 'promotion':
                return <Ionicons name="pricetag" size={24} color="#ff9800" />;
            case 'account':
                return <Ionicons name="person" size={24} color="#2196f3" />;
            case 'delivery':
                return <Ionicons name="bicycle" size={24} color="#f44336" />;
            default:
                return <Ionicons name="notifications" size={24} color="#9e9e9e" />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        } else {
            return date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    const renderNotificationItem = ({ item }: { item: Notification }) => (
        <TouchableOpacity
            style={[styles.notificationItem, item.read ? {} : styles.unreadNotification]}
            onPress={() => handleNotificationPress(item)}
        >
            <View style={styles.notificationIcon}>
                {getNotificationIcon(item.type)}
            </View>

            <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={styles.notificationDate}>
                        {formatDate(item.date)}
                    </Text>
                </View>

                <Text style={styles.notificationBody} numberOfLines={2}>
                    {item.body}
                </Text>

                {item.actionable && (
                    <View style={styles.notificationActions}>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={() => handleNotificationPress(item)}
                        >
                            <Text style={styles.viewButtonText}>
                                {item.type === 'delivery' ? 'Track Order' :
                                    item.type === 'promotion' ? 'View Offer' : 'View Details'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteNotification(item.id)}
            >
                <Ionicons name="close" size={18} color="#999" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearAllNotifications}
                    disabled={notifications.length === 0}
                >
                    <Text
                        style={[
                            styles.clearButtonText,
                            notifications.length === 0 && styles.disabledText
                        ]}
                    >
                        Clear
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'all' && styles.activeTab]}
                    onPress={() => setActiveTab('all')}
                >
                    <Text
                        style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}
                    >
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
                    onPress={() => setActiveTab('unread')}
                >
                    <Text
                        style={[styles.tabText, activeTab === 'unread' && styles.activeTabText]}
                    >
                        Unread
                    </Text>
                    {filteredNotifications.some(n => !n.read) && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadBadgeText}>
                                {filteredNotifications.filter(n => !n.read).length}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {filteredNotifications.some(n => !n.read) && (
                <TouchableOpacity
                    style={styles.markAllAsReadButton}
                    onPress={markAllAsRead}
                >
                    <Ionicons name="checkmark-circle-outline" size={18} color={Colors.light.tint} />
                    <Text style={styles.markAllAsReadText}>Mark all as read</Text>
                </TouchableOpacity>
            )}

            {displayNotifications.length > 0 ? (
                <FlatList
                    data={displayNotifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.notificationsList}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyStateTitle}>
                        {activeTab === 'all' ? 'No Notifications' : 'No Unread Notifications'}
                    </Text>
                    <Text style={styles.emptyStateText}>
                        {activeTab === 'all'
                            ? 'You don\'t have any notifications at the moment.'
                            : 'You have read all your notifications.'}
                    </Text>
                </View>
            )}
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
    clearButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    clearButtonText: {
        color: Colors.light.tint,
        fontWeight: '500',
    },
    disabledText: {
        opacity: 0.5,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'row',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.light.tint,
    },
    tabText: {
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
    unreadBadge: {
        backgroundColor: Colors.light.tint,
        borderRadius: 12,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
        paddingHorizontal: 4,
    },
    unreadBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    markAllAsReadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginHorizontal: 16,
        marginBottom: 8,
        backgroundColor: Colors.light.tint + '10',
        borderRadius: 8,
    },
    markAllAsReadText: {
        color: Colors.light.tint,
        fontWeight: '500',
        marginLeft: 8,
    },
    notificationsList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    unreadNotification: {
        backgroundColor: Colors.light.tint + '08', // Very light tint color
        borderLeftWidth: 3,
        borderLeftColor: Colors.light.tint,
    },
    notificationIcon: {
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    notificationContent: {
        flex: 1,
        marginRight: 12,
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    notificationDate: {
        fontSize: 12,
        color: '#999',
    },
    notificationBody: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    notificationActions: {
        marginTop: 8,
        flexDirection: 'row',
    },
    viewButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: Colors.light.tint + '15',
    },
    viewButtonText: {
        color: Colors.light.tint,
        fontWeight: '500',
        fontSize: 12,
    },
    deleteButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
}); 