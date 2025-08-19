import { t } from '@/i18n';
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

export const getTabBarConfig = (): TabConfig[] => [
    {
        name: '', // index route
        label: t('common.navigation.home'),
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
        label: t('common.navigation.order'),
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
        label: t('common.navigation.offers'),
        icon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
                name={focused ? 'percent' : 'percent-outline'}
                size={size}
                color={color}
            />
        ),
    },
    {
        name: 'cart',
        label: t('common.navigation.cart'),
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
        label: t('common.navigation.profile'),
        icon: ({ focused, color, size }) => (
            <Feather
                name="user"
                size={size}
                color={color}
            />
        ),
    },
];