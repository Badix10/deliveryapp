import React from 'react'
import { Text, View } from 'react-native'

interface AuthHeaderProps {
  screenWidth: number
}

export default function AuthHeader({ screenWidth }: AuthHeaderProps) {
  return (
    <View className="bg-primary-100 pt-12 pb-8 px-6" style={{ width: screenWidth }}>
      <View className="items-center">
        <View className="w-24 h-24 bg-primary-600 rounded-full items-center justify-center mb-4 shadow-lg">
          <Text className="text-white text-heading-lg font-lufga-bold">🍽️</Text>
        </View>
        
        <Text className="text-heading-xl font-lufga-bold text-primary-800 mb-2">
          Makla
        </Text>
      </View>
    </View>
  )
}
