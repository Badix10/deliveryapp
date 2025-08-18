import LanguageToggle from '@/components/common/LanguageToggle';
import { useTranslation } from '@/i18n';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Order = () => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
                <View>
                    <Text className="text-2xl font-bold text-gray-900">
                        {t('order.title')}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        {t('order.subtitle')}
                    </Text>
                </View>
                <LanguageToggle size="small" />
            </View>

            {/* Tab Navigation */}
            <View className="flex-row bg-gray-50 mx-4 mt-4 rounded-lg p-1">
                <TouchableOpacity
                    className={`flex-1 py-2 rounded-md ${activeTab === 'current' ? 'bg-white shadow-sm' : ''}`}
                    onPress={() => setActiveTab('current')}
                >
                    <Text className={`text-center font-medium ${activeTab === 'current' ? 'text-blue-600' : 'text-gray-600'}`}>
                        {t('order.currentOrders')}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    className={`flex-1 py-2 rounded-md ${activeTab === 'past' ? 'bg-white shadow-sm' : ''}`}
                    onPress={() => setActiveTab('past')}
                >
                    <Text className={`text-center font-medium ${activeTab === 'past' ? 'text-blue-600' : 'text-gray-600'}`}>
                        {t('order.pastOrders')}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                {/* Empty state */}
                <View className="flex-1 justify-center items-center px-6 py-12">
                    <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-6">
                        <Text className="text-4xl">📋</Text>
                    </View>
                    
                    <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
                        {t('order.noOrders')}
                    </Text>
                    
                    <Text className="text-gray-500 text-center mb-8 leading-6">
                        {t('order.noOrdersMessage')}
                    </Text>

                    <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg">
                        <Text className="text-white font-semibold">
                            {t('order.startShopping')}
                        </Text>
                    </TouchableOpacity>

                    {/* Preview of future order card */}
                    <View className="w-full max-w-sm mt-12">
                        <View className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                            <View className="flex-row justify-between items-start mb-3">
                                <View className="flex-1">
                                    <Text className="font-semibold text-gray-900 mb-1">
                                        {t('order.orderNumber')} #12345
                                    </Text>
                                    <Text className="text-sm text-gray-500">
                                        {t('order.orderDate')}: 15 Nov 2023
                                    </Text>
                                </View>
                                
                                <View className="bg-green-100 px-3 py-1 rounded-full">
                                    <Text className="text-green-700 text-xs font-medium">
                                        {t('order.delivered')}
                                    </Text>
                                </View>
                            </View>
                            
                            <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                                <Text className="font-bold text-lg">
                                    {t('order.total')}: $24.99
                                </Text>
                                
                                <TouchableOpacity 
                                    className="bg-blue-50 px-3 py-2 rounded-lg"
                                    disabled={true}
                                    style={{ opacity: 0.6 }}
                                >
                                    <Text className="text-blue-600 font-medium text-sm">
                                        {t('order.orderAgain')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Future: Actual orders will go here */}
                {/* 
                <View className="px-4 py-6">
                    // Order cards list based on activeTab
                </View>
                */}
            </ScrollView>
        </View>
    );
}

export default Order;