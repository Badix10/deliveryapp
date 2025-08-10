import Checkbox from '@/components/common/Checkbox'
import React from 'react'
import { Text, View } from 'react-native'

interface TermsSectionProps {
  agreeTerms: boolean
  setAgreeTerms: (value: boolean) => void
  error?: string
  onErrorClear: () => void
}

export default function TermsSection({ 
  agreeTerms, 
  setAgreeTerms, 
  error,
  onErrorClear 
}: TermsSectionProps) {
  return (
    <View className="mb-6">
      <View className="flex-row items-start">
        <View className="mt-0.5">
          <Checkbox 
            checked={agreeTerms} 
            onPress={() => {
              setAgreeTerms(!agreeTerms)
              if (error) onErrorClear()
            }} 
          />
        </View>
        <Text className="text-body-sm font-lufga text-neutral-600 flex-1 leading-5 ml-3">
          I read and agreed to{' '}
          <Text className="text-primary-600 font-lufga-medium">User Agreement</Text>
          {' '}and{' '}
          <Text className="text-primary-600 font-lufga-medium">privacy policy</Text>
        </Text>
      </View>
      {error && (
        <Text className="text-red-500 text-body-sm font-lufga mt-1 ml-8">
          {error}
        </Text>
      )}
    </View>
  )
}