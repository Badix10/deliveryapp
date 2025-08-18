import LanguageToggle from '@/components/common/LanguageToggle';
import { useTranslation } from '@/i18n';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Offers = () => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
                <View>
                    <Text className="text-2xl font-bold text-gray-900">
                        {t('offers.title')}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        {t('offers.subtitle')}
                    </Text>
                </View>
                <LanguageToggle size="small" />
            </View>

            <ScrollView className="flex-1">
                {/* Empty state */}
                <View className="flex-1 justify-center items-center px-6 py-12">
                    <View className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full items-center justify-center mb-6">
                        <Text className="text-4xl">🎯</Text>
                    </View>
                    
                    <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
                        {t('offers.noOffers')}
                    </Text>
                    
                    <Text className="text-gray-500 text-center mb-8 leading-6">
                        {t('offers.noOffersMessage')}
                    </Text>

                    {/* Preview of future offer cards */}
                    <View className="w-full max-w-sm">
                        <View className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-4">
                            <View className="flex-row items-center mb-2">
                                <Text className="text-blue-600 font-semibold text-sm px-2 py-1 bg-blue-100 rounded">
                                    {t('offers.comingSoon')}
                                </Text>
                                <View className="ml-2 flex-row items-center">
                                    <Text className="text-sm text-gray-600">
                                        30% {t('offers.off')}
                                    </Text>
                                </View>
                            </View>
                            
                            <Text className="text-lg font-bold text-gray-900 mb-1">
                                {t('offers.weeklyOffers')}
                            </Text>
                            
                            <Text className="text-sm text-gray-600 mb-3">
                                {t('offers.limitedTime')} • {t('offers.freeDelivery')}
                            </Text>
                            
                            <TouchableOpacity 
                                className="bg-blue-600 py-2 px-4 rounded-lg"
                                disabled={true}
                                style={{ opacity: 0.6 }}
                            >
                                <Text className="text-white font-semibold text-center">
                                    {t('offers.claimOffer')}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-xs text-gray-400 text-center mt-4">
                            {t('offers.termsAndConditions')}
                        </Text>
                    </View>
                </View>

                {/* Future: Actual offers will go here */}
                {/* 
                <View className="px-4 py-6">
                    <Text className="text-lg font-semibold text-gray-900 mb-4">
                        {t('offers.todaysOffers')}
                    </Text>
                    // Offer cards list
                </View>
                */}
            </ScrollView>
        </View>
    );
}

export default Offers;