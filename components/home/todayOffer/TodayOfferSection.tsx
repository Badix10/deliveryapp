// ========== components/home/TodaysOfferSection.tsx ==========
import { t } from '@/i18n';
import { mockOffers } from '@/mock/mockDataHomePage';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import OfferCard from './OfferCard';
export default function TodaysOfferSection() {
  const handleSeeAll = () => {
    router.push('/offers');
  };

  const handleOfferPress = () => {
    router.push('/offers');
  };

  // Prendre la première offre des mockData
  const featuredOffer = mockOffers[0];

  return (
    <View className="py-6">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-title-md font-lufga-bold text-neutral-900">
          {t('home.todaysOffer.title')}
        </Text>
        
        <Pressable onPress={handleSeeAll}>
          <Text className="text-body-sm font-lufga-medium text-neutral-500">
            {t('home.todaysOffer.seeAll')}
          </Text>
        </Pressable>
      </View>

      {/* Offer Card */}
      <OfferCard
        title={featuredOffer.title}
        description={featuredOffer.description}
        discount={featuredOffer.discount}
        code={featuredOffer.code}
        onPress={handleOfferPress}
      />
    </View>
  );
}