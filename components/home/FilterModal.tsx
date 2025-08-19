// ========== components/home/FilterModal.tsx ==========
import { t } from '@/i18n';
import { mockFoodCategories } from '@/mock/mockDataHomePage';
import { Ionicons } from '@expo/vector-icons';
// import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  distance: number;
  rating: number;
  freeDelivery: boolean;
}

export default function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [distance, setDistance] = useState(5);
  const [rating, setRating] = useState(0);
  const [freeDelivery, setFreeDelivery] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleApply = () => {
    onApply({
      categories: selectedCategories,
      priceRange,
      distance,
      rating,
      freeDelivery,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setDistance(5);
    setRating(0);
    setFreeDelivery(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <Pressable className="flex-1" onPress={onClose} />
        
        <View className="bg-white rounded-t-3xl max-h-[80%]">
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-neutral-200">
            <Text className="text-title-md font-lufga-bold text-neutral-900">
              {t('common.filters')}
            </Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color="#1A1A1A" />
            </Pressable>
          </View>

          <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
            {/* Categories */}
            <View className="py-4">
              <Text className="text-body font-lufga-semibold text-neutral-900 mb-3">
                {t('common.categories')}
              </Text>
              <View className="flex-row flex-wrap">
                {mockFoodCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => toggleCategory(category.id)}
                    className={`mr-3 mb-3 px-4 py-2 rounded-full border ${
                      selectedCategories.includes(category.id)
                        ? 'bg-primary-600 border-primary-600'
                        : 'bg-white border-neutral-300'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Text className="mr-2">{category.icon}</Text>
                      <Text
                        className={`font-lufga-medium text-body-sm ${
                          selectedCategories.includes(category.id)
                            ? 'text-white'
                            : 'text-neutral-700'
                        }`}
                      >
                        {category.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View className="py-4 border-t border-neutral-100">
              <Text className="text-body font-lufga-semibold text-neutral-900 mb-3">
                {t('home.filters.priceRange')}
              </Text>
              <View className="flex-row justify-between mb-2">
                <Text className="text-body-sm text-neutral-600 font-lufga">
                  {priceRange[0]} DZD
                </Text>
                <Text className="text-body-sm text-neutral-600 font-lufga">
                  {priceRange[1]} DZD
                </Text>
              </View>
              <View className="flex-row items-center">
                {/* <Slider
                  style={{ flex: 1, height: 40 }}
                  minimumValue={0}
                  maximumValue={5000}
                  value={priceRange[0]}
                  onValueChange={(value) => setPriceRange([value, priceRange[1]])}
                  minimumTrackTintColor="#006233"
                  maximumTrackTintColor="#E8E8E8"
                  thumbTintColor="#006233"
                /> */}
              </View>
            </View>

            {/* Distance */}
            <View className="py-4 border-t border-neutral-100">
              <Text className="text-body font-lufga-semibold text-neutral-900 mb-3">
                {t('home.filters.maxDistance')}
              </Text>
              <View className="flex-row justify-between mb-2">
                <Text className="text-body-sm text-neutral-600 font-lufga">
                  {distance} km
                </Text>
              </View>
              {/* <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={1}
                maximumValue={20}
                value={distance}
                onValueChange={setDistance}
                step={1}
                minimumTrackTintColor="#006233"
                maximumTrackTintColor="#E8E8E8"
                thumbTintColor="#006233"
              /> */}
            </View>

            {/* Rating */}
            <View className="py-4 border-t border-neutral-100">
              <Text className="text-body font-lufga-semibold text-neutral-900 mb-3">
                {t('home.filters.minimumRating')}
              </Text>
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    className="mr-2"
                  >
                    <Ionicons
                      name={star <= rating ? 'star' : 'star-outline'}
                      size={28}
                      color={star <= rating ? '#F59E0B' : '#D1D1D1'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Free Delivery */}
            <View className="py-4 border-t border-neutral-100">
              <TouchableOpacity
                onPress={() => setFreeDelivery(!freeDelivery)}
                className="flex-row items-center justify-between"
              >
                <Text className="text-body font-lufga-semibold text-neutral-900">
                  {t('home.filters.freeDeliveryOnlyToggle')}
                </Text>
                <View
                  className={`w-12 h-6 rounded-full ${
                    freeDelivery ? 'bg-primary-600' : 'bg-neutral-300'
                  }`}
                >
                  <View
                    className={`w-5 h-5 bg-white rounded-full m-0.5 ${
                      freeDelivery ? 'self-end' : 'self-start'
                    }`}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View className="flex-row py-6 pb-8">
              <TouchableOpacity
                onPress={handleReset}
                className="flex-1 mr-2 py-3 border border-neutral-300 rounded-button"
              >
                <Text className="text-center text-neutral-700 font-lufga-semibold text-body">
                  {t('home.filters.reset')}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleApply}
                className="flex-1 ml-2 py-3 bg-primary-600 rounded-button"
              >
                <Text className="text-center text-white font-lufga-semibold text-body">
                  {t('home.filters.applyFilters')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}