import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.light.background,
                },
                headerTintColor: Colors.light.tint,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        />
    );
} 