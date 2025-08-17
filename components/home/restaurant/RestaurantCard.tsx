// ========== components/home/RestaurantCard.tsx ==========
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.75;

interface RestaurantCardProps {
  id: string;
  name: string;
  logo_url: string | null;
  rating?: number;
  distance?: number;
  preparation_time: number;
  delivery_fee: number;
  description?: string | null;
  is_open: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export default function RestaurantCard({
  id,
  name,
  logo_url,
  rating = 4.5,
  distance = 1.0,
  preparation_time,
  delivery_fee,
  description,
  is_open,
  onFavoriteToggle,
}: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const scale = useSharedValue(1);
  const favoriteScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  const handlePress = () => {
    router.push({
      pathname: '/restaurant/[id]',
      params: { id },
    });
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: 15,
      stiffness: 400,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    favoriteScale.value = withSpring(0.8, {}, () => {
      favoriteScale.value = withSpring(1.2, {}, () => {
        favoriteScale.value = withSpring(1);
      });
    });
    onFavoriteToggle?.(id);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, { width: CARD_WIDTH }]}
      className="mr-4 bg-white rounded-2xl overflow-hidden shadow-md"
    >
      {/* Image Container */}
      <View className="relative h-40 bg-neutral-100">
        <Image
          source={{ 
            uri: logo_url || 'https://via.placeholder.com/400x300/f3f4f6/8c8c8c?text=Restaurant',
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Overlay gradient pour le texte */}
        <View className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Pattern décoratif */}
        <View className="absolute inset-0 opacity-10">
          <Text className="text-8xl absolute top-2 left-2">🍔</Text>
          <Text className="text-6xl absolute bottom-2 right-2">🍟</Text>
        </View>

        {/* Badge Rating */}
        <View className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full flex-row items-center shadow-sm">
          <Text className="text-body-sm font-lufga-bold text-neutral-900 mr-1">
            {rating.toFixed(1)}
          </Text>
          <Ionicons name="star" size={14} color="#F59E0B" />
        </View>

        {/* Favorite Button */}
        <Pressable 
          onPress={handleFavoritePress}
          className="absolute top-3 right-3 w-11 h-11 bg-white rounded-full items-center justify-center shadow-sm"
        >
          <Animated.View style={animatedHeartStyle}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={18} 
              color={isFavorite ? "#D21034" : "#8C8C8C"} 
            />
          </Animated.View>
        </Pressable>

        {/* Status Badge */}
        {!is_open && (
          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900/80 px-3 py-1 rounded-full">
            <Text className="text-white text-body-sm font-lufga-medium">
              Fermé
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="p-3">
        {/* Restaurant Name */}
        <Text className="text-body font-lufga-semibold text-neutral-900 mb-1" numberOfLines={1}>
          {name}
        </Text>

        {/* Description */}
        {description && (
          <Text className="text-caption text-neutral-500 font-lufga mb-2" numberOfLines={1}>
            {description}
          </Text>
        )}

        {/* Info Row */}
        <View className="flex-row items-center justify-between">
          {/* Distance & Time */}
          <View className="flex-row items-center">
            <View className="flex-row items-center mr-3">
              <Ionicons name="location-outline" size={14} color="#8C8C8C" />
              <Text className="text-caption text-neutral-600 font-lufga ml-1">
                {distance} km
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={14} color="#8C8C8C" />
              <Text className="text-caption text-neutral-600 font-lufga ml-1">
                {preparation_time} min
              </Text>
            </View>
          </View>

          {/* Delivery Fee */}
          <View className="bg-primary-50 px-2 py-1 rounded-md">
            <Text className="text-caption font-lufga-medium text-primary-700">
              {delivery_fee} DZD
            </Text>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
}