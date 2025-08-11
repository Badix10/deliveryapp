import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CategoryItemProps {
  name: string;
  nameEn?: string | null;
  nameAr?: string | null;
  icon: string;
  color: string;
  isSelected: boolean;
  onPress: (name: string) => void;
  restaurantCount?: number;
  language?: 'fr' | 'en' | 'ar';
}

export default function CategoryItem({
  name,
  nameEn,
  nameAr,
  icon,
  color,
  isSelected,
  onPress,
  restaurantCount,
  language = 'fr',
}: CategoryItemProps) {
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(0);

  // Choisir le nom selon la langue
  const displayName = React.useMemo(() => {
    switch (language) {
      case 'en':
        return nameEn || name;
      case 'ar':
        return nameAr || name;
      default:
        return name;
    }
  }, [name, nameEn, nameAr, language]);

  React.useEffect(() => {
    borderWidth.value = withTiming(isSelected ? 2 : 0, { duration: 200 });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderWidth: borderWidth.value,
    borderColor: '#006233',
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 400,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 400,
    });
  };

  const handlePress = () => {
    onPress(name);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      className="mr-3 rounded-xl overflow-hidden"
    >
      <View 
        className="px-5 py-3 rounded-xl flex-row items-center"
        style={{ 
          backgroundColor: isSelected ? color : color + '99',
          minWidth: 100,
        }}
      >
        {/* Icon */}
        <Text className="text-2xl mr-2">{icon}</Text>
        
        {/* Name */}
        <Text 
          className={`${
            isSelected ? 'font-lufga-semibold' : 'font-lufga-medium'
          } text-body-sm text-neutral-900`}
          numberOfLines={1}
        >
          {displayName}
        </Text>
        
        {/* Count Badge */}
        {restaurantCount !== undefined && restaurantCount > 0 && (
          <View className="ml-2 bg-white/70 px-2 py-0.5 rounded-full">
            <Text className="text-caption-xs font-lufga-medium text-neutral-700">
              {restaurantCount}
            </Text>
          </View>
        )}
      </View>
    </AnimatedPressable>
  );
}