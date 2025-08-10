import { useUIStore } from '@/stores/uiStore'
import React from 'react'
import { Text, View } from 'react-native'

interface AuthModeSwitchProps {
  isSignUp: boolean
}

export default function AuthModeSwitch({ isSignUp }: AuthModeSwitchProps) {
  const { setAuthMode } = useUIStore()
  
  const toggleMode = () => {
    const newMode = isSignUp ? 'login' : 'signup'
    setAuthMode(newMode)
  }

  return (
    <View className="items-center">
      <Text className="text-body-sm font-lufga text-neutral-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Text 
          onPress={toggleMode}
          className="text-primary-600 font-lufga-semibold"
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </Text>
      </Text>
    </View>
  )
}