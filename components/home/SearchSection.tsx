import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

interface SearchSectionProps {
  onFilterPress: () => void;
}

export default function SearchSection({ onFilterPress }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <View className="px-4 pb-6">
      <View className="flex-row items-center bg-neutral-800 rounded-full">
        <View className="flex-1 flex-row items-center px-4 py-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search here..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-body-sm text-white font-lufga"
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>

        {/* Filter Button */}
        <Pressable
          onPress={onFilterPress}
          className="bg-secondary  flex-row items-center px-4 py-3 rounded-full mr-1.5"
        >
          <Text className="text-neutral-900 font-lufga-medium text-body-sm mr-2">
            Filter
          </Text>
          <MaterialCommunityIcons name="tune-variant" size={18} color="#1A1A1A" />
        </Pressable>
      </View>
    </View>
  );
}