import FoodCategories from '@/components/home/category/FoodCategories';
import FastestNearYou from '@/components/home/restaurant/FastestNearYou';
import TodaysOfferSection from '@/components/home/todayOffer/TodayOfferSection';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { FilterOptions } from '../../components/home/FilterModal';
import HomeHeader from '../../components/home/HomeHeader';

export default function HomeScreen() {
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);

  const handleFiltersApply = (filters: FilterOptions) => {
    setActiveFilters(filters);
    // Ici vous pouvez filtrer vos restaurants/produits
    console.log('Applying filters:', filters);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />

      {/* Header avec fond noir */}
      <HomeHeader onFiltersApply={handleFiltersApply} />

      {/* Contenu principal */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4">
          {/* Debug - Afficher les filtres actifs */}
          {activeFilters && (
            <View className="mb-4 p-3 bg-primary-50 rounded-lg">
              <Text className="text-body-sm font-lufga-medium text-primary-800">
                Filtres actifs:
              </Text>
              {activeFilters.categories.length > 0 && (
                <Text className="text-caption text-primary-700 font-lufga mt-1">
                  Catégories: {activeFilters.categories.join(', ')}
                </Text>
              )}
              {activeFilters.freeDelivery && (
                <Text className="text-caption text-primary-700 font-lufga mt-1">
                  Livraison gratuite uniquement
                </Text>
              )}
              <Text className="text-caption text-primary-700 font-lufga mt-1">
                Distance max: {activeFilters.distance} km
              </Text>
              {activeFilters.rating > 0 && (
                <Text className="text-caption text-primary-700 font-lufga mt-1">
                  Note min: {activeFilters.rating} ⭐
                </Text>
              )}
            </View>
          )}

          {/* Le reste du contenu de la page viendra ici */}
          <TodaysOfferSection />

          <FoodCategories />

          {/* Fastest Near You Section */}
          <FastestNearYou />
        </View>
      </ScrollView>
    </View>
  );
}