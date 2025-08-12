import { useLocalStorage, useSearch } from '@/hooks';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

interface SearchSectionProps {
  onFilterPress: () => void;
}

// Mock search function - remplacer par vraie API plus tard
const mockSearchRestaurants = async (query: string) => {
  // Simuler un délai de réseau
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockRestaurants = [
    { id: '1', name: 'Burger Palace', category: 'Fast Food' },
    { id: '2', name: 'Pizza Express', category: 'Italian' },
    { id: '3', name: 'Sushi Master', category: 'Japanese' },
    { id: '4', name: 'Taco Fiesta', category: 'Mexican' },
  ];
  
  return mockRestaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
    restaurant.category.toLowerCase().includes(query.toLowerCase())
  );
};

export default function SearchSection({ onFilterPress }: SearchSectionProps) {
  // Historique de recherche persistant
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('search_history', []);
  
  const { query, setQuery, results, loading, clearSearch } = useSearch({
    searchFunction: mockSearchRestaurants,
    debounceMs: 300,
    minQueryLength: 2
  });

  const addToHistory = (searchTerm: string) => {
    if (searchTerm.trim() && !searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory.slice(0, 9)]; // Garder 10 recherches max
      setSearchHistory(newHistory);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      addToHistory(query);
      console.log('Search results:', results);
      console.log('Search history:', searchHistory);
      console.log('Loading:', loading);
    }
  };

  return (
    <View className="px-4 pb-6">
      <View className="flex-row items-center bg-neutral-800 rounded-full">
        <View className="flex-1 flex-row items-center px-4 py-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search restaurants, food..."
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