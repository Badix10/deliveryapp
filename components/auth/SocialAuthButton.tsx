import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

interface SocialAuthButtonsProps {
  isSignUp: boolean
}

const socialProviders = [
  { name: 'facebook', icon: 'facebook', color: '#1877F2', size: 24 },
  { name: 'google', icon: 'google', color: '#DB4437', size: 22 },
  { name: 'apple', icon: 'apple', color: '#000000', size: 24 }
]

export default function SocialAuthButtons({ isSignUp }: SocialAuthButtonsProps) {
  return (
    <>
      {/* Separator */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-neutral-300" />
        <Text className="mx-4 text-body-sm font-lufga text-neutral-500">
          Or {isSignUp ? 'Sign Up' : 'Login'} with
        </Text>
        <View className="flex-1 h-px bg-neutral-300" />
      </View>

      {/* Social Buttons */}
      <View className="flex-row justify-center space-x-6 mb-8">
        {socialProviders.map((provider) => (
          <TouchableOpacity
            key={provider.name}
            className="w-14 h-14 rounded-full bg-neutral-100 items-center justify-center border border-neutral-200"
            style={{ 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 1 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 2,
              elevation: 2
            }}
          >
            <FontAwesome 
              name={provider.icon} 
              size={provider.size} 
              color={provider.color} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}