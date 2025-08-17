import React from 'react';
import { Text, View } from 'react-native';

export default function HeaderTitle() {
    return (
        <View className="px-4 py-2">
            <Text className="text-title-lg text-white font-lufga-bold leading-tight">
                What are you going{'\n'}
                to eat today?
            </Text>
        </View>
    );
}