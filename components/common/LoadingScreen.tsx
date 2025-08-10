import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <View className="items-center">

        <View className="w-20 h-20 bg-primary-50 rounded-2xl justify-center items-center mb-4">
          <ActivityIndicator size="large" color="#006233" />
        </View>

        <Text className="font-lufga-medium text-body text-neutral-700">
          Chargement...
        </Text>


        <Text className="font-lufga text-caption text-neutral-500 mt-2">
          Préparation de votre expérience
        </Text>
      </View>


      <View className="flex-row mt-8 gap-2">
        <View className="w-2 h-2 bg-primary-600 rounded-full animate-pulse-soft" />
        <View className="w-2 h-2 bg-primary-400 rounded-full animate-pulse-soft" />
        <View className="w-2 h-2 bg-primary-200 rounded-full animate-pulse-soft" />
      </View>
    </View>
  );
};
export default LoadingScreen