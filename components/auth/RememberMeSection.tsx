import Checkbox from '@/components/common/Checkbox'
import { useUIStore } from '@/stores/uiStore'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


interface RememberMeSectionProps {
  rememberMe: boolean
  setRememberMe: (value: boolean) => void
}

export default function RememberMeSection({ rememberMe, setRememberMe }: RememberMeSectionProps) {
  const { setAuthMode } = useUIStore()
  
  return (
    <View className="flex-row items-center justify-between mb-6">
      <View className="flex-row items-center">
        <Checkbox checked={rememberMe} onPress={() => setRememberMe(!rememberMe)} />
        <Text className="text-body-sm font-lufga text-neutral-600 ml-3">
          Remember me
        </Text>
      </View>
      
      <TouchableOpacity onPress={() => setAuthMode('forgot')}>
        <Text className="text-body-sm font-lufga-medium text-secondary-500">
          Forgot Password
        </Text>
      </TouchableOpacity>
    </View>
  )
}