import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useCartStore } from '../../stores/cartStore';
import { useLocationStore } from '../../stores/locationStore';

export default function LocationBar() {
  const { currentLocation } = useLocationStore();
  const { itemsCount } = useCartStore();
//   const { balance, currency } = useWalletStore();

  const handleLocationPress = () => {
    router.push('/location-picker' as Href);
  };

  const handleCartPress = () => {
    router.push('/cart');
  };

  const handleWalletPress = () => {
    router.push('/wallet' as Href);
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-2">
      {/* Location Button */}
      <Pressable 
        onPress={handleLocationPress}
        className="flex-row items-center flex-1"
      >
        <View className="w-11 h-11 rounded-full bg-neutral-800 items-center justify-center mr-3">
          <Ionicons name="location-sharp" size={20} color="#FFFFFF" />
        </View>
        
        <View className="flex-1">
          <Text className="text-caption text-neutral-400 font-lufga">
            Location
          </Text>
          <Text className="text-body-xs text-white font-lufga-medium" numberOfLines={1}>
            {currentLocation.address}
          </Text>
        </View>
        
        <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
      </Pressable>

      {/* Action Buttons */}
      <View className="flex-row items-center ml-2">
        {/* Cart Button */}
        <Pressable 
          onPress={handleCartPress}
          className="relative mr-2 p-1"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View className="w-11 h-11 rounded-full bg-neutral-800 items-center justify-center">
            <Ionicons name="cart-outline" size={22} color="#FFFFFF" />
          </View>
          
          {itemsCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-secondary-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1">
              <Text className="text-white text-caption-xs font-lufga-bold">
                {itemsCount}
              </Text>
            </View>
          )}
        </Pressable>

        {/* Wallet Button */}
        <Pressable 
          onPress={handleWalletPress}
          className="relative p-1"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View className="w-11 h-11 rounded-full bg-neutral-800 items-center justify-center">
            <MaterialCommunityIcons name="wallet-outline" size={20} color="#FFFFFF" />
          </View>
          
          <View className="absolute -bottom-1 -right-1 bg-primary-600 rounded-full h-2 w-2" />
        </Pressable>
      </View>
    </View>
  );
}