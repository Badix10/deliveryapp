import LanguageToggle from '@/components/common/LanguageToggle';
import { useTranslation } from '@/i18n';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Cart = () => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
                <View>
                    <Text className="text-2xl font-bold text-gray-900">
                        {t('cart.title')}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        {t('cart.subtitle')}
                    </Text>
                </View>
                <LanguageToggle size="small" />
            </View>

            <ScrollView className="flex-1">
                {/* Empty state */}
                <View className="flex-1 justify-center items-center px-6 py-12">
                    <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-6">
                        <Text className="text-4xl">🛒</Text>
                    </View>
                    
                    <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
                        {t('cart.empty')}
                    </Text>
                    
                    <Text className="text-gray-500 text-center mb-8 leading-6">
                        {t('cart.emptyMessage')}
                    </Text>

                    <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg">
                        <Text className="text-white font-semibold">
                            {t('cart.addItems')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Future: Cart items will go here */}
                {/* 
                <View className="px-4 py-6">
                    <Text className="text-lg font-semibold text-gray-900 mb-4">
                        3 {t('cart.items')}
                    </Text>
                    // Cart items list
                </View>
                
                <View className="px-4 py-6 border-t border-gray-200">
                    <View className="bg-gray-50 rounded-xl p-4 mb-4">
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="text-gray-700">{t('cart.subtotal')}</Text>
                            <Text className="font-semibold">$24.99</Text>
                        </View>
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="text-gray-700">{t('cart.delivery')}</Text>
                            <Text className="font-semibold text-green-600">{t('cart.freeDelivery')}</Text>
                        </View>
                        <View className="flex-row justify-between items-center pt-2 border-t border-gray-200">
                            <Text className="text-lg font-bold">{t('cart.total')}</Text>
                            <Text className="text-lg font-bold">$24.99</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="bg-blue-600 py-4 rounded-lg">
                        <Text className="text-center text-white font-semibold text-lg">
                            {t('cart.checkout')}
                        </Text>
                    </TouchableOpacity>
                </View>
                */}
            </ScrollView>
        </View>
    );
}

export default Cart;