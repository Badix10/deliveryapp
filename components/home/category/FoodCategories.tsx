import { mockCategories } from '@/mock/mockCategory';
import { useAuthStore } from '@/stores/authStore';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native';
import CategoryItem from './CategoryItem';

export default function FoodCategories() {
  const { 
    categories, 
    isLoading, 
    error, 
    selectedCategoryName,
    fetchCategories,
    selectCategory,
  } = useCategoriesStore();
  
  // Obtenir la langue de l'utilisateur depuis le profil
  const { profile } = useAuthStore();
  const userLanguage = profile?.preferred_language || 'fr';

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    // Charger les catégories au montage
    fetchCategories();
  }, []);

  const handleCategoryPress = (categoryName: string) => {
    // Toggle selection
    if (selectedCategoryName === categoryName) {
      selectCategory(null);
    } else {
      selectCategory(categoryName);
      // Naviguer vers les restaurants de cette catégorie
      router.push({
        pathname: '/restaurants',
        params: { category: categoryName },
      });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCategories();
    setRefreshing(false);
  };

  if (error && categories.length === 0) {
    return (
      <View className="py-4 px-4">
        <Text className="text-error-DEFAULT font-lufga text-body-sm">
          Impossible de charger les catégories
        </Text>
      </View>
    );
  }

  return (
    <View className="py-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: 16,
          alignItems: 'center',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#006233"
          />
        }
      >
        {isLoading && categories.length === 0 ? (
          <View className="py-8 px-10">
            <ActivityIndicator size="small" color="#006233" />
          </View>
        ) : (
          <>
            {/* Message d'info si données offline */}
            {error === 'Using offline data' && (
              <View className="mr-3 bg-warning-light/30 px-3 py-2 rounded-lg">
                <Text className="text-caption text-neutral-600 font-lufga">
                  Mode hors ligne
                </Text>
              </View>
            )}
            
            {/* Catégories */}
            {mockCategories.map((category) => (
              <CategoryItem
                key={category.id}
                name={category.name}
                nameEn={category.name_en}
                nameAr={category.name_ar}
                icon={category.icon}
                color={category.color}
                isSelected={selectedCategoryName === category.name}
                onPress={handleCategoryPress}
                restaurantCount={category.restaurantCount}
                language={userLanguage}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}