// ========== components/home/FastestNearYou.tsx ==========
import { useRestaurantsStore } from '@/stores/restaurantsStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native';
import RestaurantCard from './RestaurantCard';

export default function FastestNearYou() {
  const { 
    nearbyRestaurants, 
    isLoading, 
    error,
    fetchNearbyRestaurants,
    toggleFavorite,
  } = useRestaurantsStore();
  
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    // Charger les restaurants proches au montage
    fetchNearbyRestaurants();
  }, []);

  const handleSeeAll = () => {
    router.push('/restaurants');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNearbyRestaurants();
    setRefreshing(false);
  };

  const handleFavoriteToggle = (restaurantId: string) => {
    toggleFavorite(restaurantId);
  };

  return (
    <View className="py-6">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-title-md font-lufga-bold text-neutral-900">
          Fastest Near You
        </Text>
        
        <Pressable onPress={handleSeeAll}>
          <Text className="text-body-sm font-lufga-medium text-neutral-500">
            See All
          </Text>
        </Pressable>
      </View>

      {/* Error Message */}
      {error && error !== 'Using offline data' && (
        <View className="px-4 mb-2">
          <Text className="text-caption text-error-DEFAULT font-lufga">
            {error}
          </Text>
        </View>
      )}

      {/* Offline Indicator */}
      {error === 'Using offline data' && (
        <View className="mx-4 mb-2 bg-warning-light/20 px-3 py-2 rounded-lg">
          <Text className="text-caption text-neutral-600 font-lufga">
            📡 Mode hors ligne - Données en cache
          </Text>
        </View>
      )}

      {/* Restaurant Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: 16,
          paddingBottom: 8,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#006233"
          />
        }
      >
        {isLoading ? (
          <View className="py-16 px-20">
            <ActivityIndicator size="large" color="#006233" />
          </View>
        ) : nearbyRestaurants.length > 0 ? (
          nearbyRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              logo_url={restaurant.logo_url}
              rating={restaurant.rating}
              distance={restaurant.distance}
              preparation_time={restaurant.preparation_time}
              delivery_fee={restaurant.delivery_fee}
              description={restaurant.description}
              is_open={restaurant.is_open}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
        ) : (
          <View className="py-16 px-20">
            <Text className="text-body text-neutral-500 font-lufga text-center">
              Aucun restaurant à proximité
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}