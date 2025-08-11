import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';


interface OfferCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onPress?: () => void;
  discount?: string;
  code?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function OfferCard({
  title = 'Free Delivery',
  description = 'Enjoy exclusive discounts on tasty food today!',
  buttonText = 'Order Now',
  onPress,
  discount = 'FREE',
  code = 'FREEDEL',
}: OfferCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/offers');
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      className="mx-4"
    >
      <LinearGradient
        colors={['#FEF3E2', '#FDE9D1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-5 overflow-hidden"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 5,
        }}
      >
        <View className="flex-row items-center justify-between">
          {/* Content Section */}
          <View className="flex-1 pr-4">
            {/* Badge de réduction */}
            <View className="absolute -top-2 -left-2 bg-secondary-500 px-2 py-1 rounded-md">
              <Text className="text-white text-caption-xs font-lufga-bold">
                {discount}
              </Text>
            </View>

            {/* Title */}
            <Text className="text-heading-sm font-lufga-bold text-neutral-900 mt-3 mb-2">
              {title}
            </Text>

            {/* Description */}
            <Text className="text-body-sm font-lufga text-neutral-600 mb-4 leading-5">
              {description}
            </Text>

            {/* Code promo (optionnel) */}
            {code && (
              <View className="bg-white/60 self-start px-3 py-1 rounded-md mb-3">
                <Text className="text-caption font-lufga-medium text-primary-700">
                  Code: {code}
                </Text>
              </View>
            )}

            {/* CTA Button */}
            <Pressable
              onPress={handlePress}
              className="bg-neutral-900 self-start px-5 py-3 rounded-button"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text className="text-white font-lufga-semibold text-body-sm">
                {buttonText}
              </Text>
            </Pressable>
          </View>

          {/* Burger Character Image */}
          <View className="relative">
            <Image
              source={{
                //uri: 'https://cdn-icons-png.flaticon.com/512/3480/3480823.png',
                uri: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
              }}
              className="w-32 h-32"
              resizeMode="contain"
            />
            
            {/* Animation decorative elements */}
            <View className="absolute -top-2 -right-2 w-6 h-6 bg-warning-light rounded-full opacity-60" />
            <View className="absolute -bottom-1 -left-2 w-4 h-4 bg-secondary-200 rounded-full opacity-50" />
          </View>
        </View>

        {/* Decorative Pattern */}
        <View className="absolute -bottom-10 -right-10 w-32 h-32 bg-warning-light/20 rounded-full" />
        <View className="absolute -top-8 -right-8 w-24 h-24 bg-secondary-100/30 rounded-full" />
      </LinearGradient>
    </AnimatedPressable>
  );
}