import {
    Feather,
    Ionicons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import React from 'react';

export interface TabConfig {
    name: string;
    label: string;
    icon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => React.ReactNode;
    badge?: string | number;
}

export const tabBarConfig: TabConfig[] = [
    {
        name: '', // index route
        label: 'Home',
        icon: ({ focused, color, size }) => (
            <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
            />
        ),
    },
    {
        name: 'order',
        label: 'Order',
        icon: ({ focused, color, size }) => (
            <Ionicons
                name={focused ? 'bag-handle' : 'bag-handle-outline'}
                size={size}
                color={color}
            />
        ),
    },
    {
        name: 'offers',
        label: 'Offer',
        icon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
                name={focused ? 'percent-circle' : 'percent-circle-outline'}
                size={size}
                color={color}
            />
        ),
    },
    {
        name: 'cart',
        label: 'Chart',
        icon: ({ focused, color, size }) => (
            <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={size}
                color={color}
            />
        ),
        badge: '3', // Nombre d'articles dans le panier
    },
    {
        name: 'profile',
        label: 'Profile',
        icon: ({ focused, color, size }) => (
            <Feather
                name="user"
                size={size}
                color={color}
            />
        ),
    },
];