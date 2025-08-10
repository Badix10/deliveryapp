import { Href, router } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { TabConfig } from './tabBarConfig';

interface TabBarItemProps {
    tab: TabConfig;
    isActive: boolean;
}

export default function TabBarItem({ tab, isActive }: TabBarItemProps) {
    // Animation values
    const scale = useSharedValue(1);
    const indicatorTranslateY = useSharedValue(-20);
    const indicatorOpacity = useSharedValue(0);
    const iconTranslateY = useSharedValue(0);

    // Effect pour gérer l'indicateur quand l'état actif change
    useEffect(() => {
        if (isActive) {
            // Animation d'entrée de l'indicateur
            indicatorTranslateY.value = withSpring(-20);
            indicatorTranslateY.value = withTiming(0, {
                duration: 400,
                easing: Easing.out(Easing.back(1.5)),
            });
            indicatorOpacity.value = withTiming(1, {
                duration: 300,
            });
            
            // Légère animation de l'icône vers le bas
            iconTranslateY.value = withSpring(2, {
                damping: 15,
                stiffness: 150,
            });
        } else {
            // Animation de sortie de l'indicateur
            indicatorTranslateY.value = withTiming(-20, {
                duration: 200,
                easing: Easing.in(Easing.ease),
            });
            indicatorOpacity.value = withTiming(0, {
                duration: 200,
            });
            
            // Retour de l'icône à sa position
            iconTranslateY.value = withSpring(0, {
                damping: 15,
                stiffness: 150,
            });
        }
    }, [isActive]);

    // Style animé pour le conteneur principal (scale au press)
    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    // Style animé pour l'indicateur du haut
    const animatedIndicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: indicatorTranslateY.value },
                { scale: interpolate(
                    indicatorTranslateY.value,
                    [-20, 0],
                    [0.3, 1]
                )}
            ],
            opacity: indicatorOpacity.value,
        };
    });

    // Style animé pour l'icône
    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: iconTranslateY.value },
                { scale: isActive ? 1.05 : 1 }
            ],
        };
    });

    // Style animé pour le label
    const animatedLabelStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isActive ? 1 : 0.7, { duration: 200 }),
            transform: [
                { scale: withTiming(isActive ? 1.05 : 1, { duration: 200 }) }
            ],
        };
    });

    // Style animé pour le badge
    const animatedBadgeStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: withSpring(isActive ? 1.1 : 1) }
        ],
    }));

    const handlePressIn = () => {
        // Animation de pression (scale down)
        scale.value = withSpring(0.9, {
            damping: 15,
            stiffness: 400,
        });
    };

    const handlePressOut = () => {
        // Retour à la taille normale
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 400,
        });
    };

    const handlePress = () => {
        // Navigation
        const route = tab.name === '' ? '/' : `/${tab.name}`;
        router.push(route as Href);
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            className="flex-1 items-center justify-center py-1"
        >
            <Animated.View
                style={animatedContainerStyle}
                className="items-center relative"
            >
                {/* Indicateur/Motif qui descend du haut */}
                <Animated.View
                    style={[animatedIndicatorStyle]}
                    className="absolute -top-2 w-1 h-1 rounded-full bg-primary-600"
                />
                
                {/* Conteneur de l'icône avec badge */}
                <Animated.View style={animatedIconStyle}>
                    <View className="relative">
                        {tab.icon({
                            focused: isActive,
                            color: isActive ? '#006233' : '#9CA3AF',
                            size: 24,
                        })}

                        {/* Badge pour le panier */}
                        {tab.badge && (
                            <Animated.View 
                                className="absolute -top-1 -right-0.5 bg-secondary-500 rounded-full min-w-[16px] h-4 items-center justify-center px-1"
                                style={animatedBadgeStyle}
                            >
                                <Text className="text-white text-caption-xs font-lufga-bold">
                                    {tab.badge}
                                </Text>
                            </Animated.View>
                        )}
                    </View>
                </Animated.View>

                {/* Label */}
                <Animated.View style={animatedLabelStyle}>
                    <Text
                        className={`text-caption-xs mt-1 ${
                            isActive
                                ? 'text-primary-600 font-lufga-semibold'
                                : 'text-neutral-500 font-lufga'
                        }`}
                    >
                        {tab.label}
                    </Text>
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}