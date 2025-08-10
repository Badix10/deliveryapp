import React from 'react'
import { Text, TextInput, View } from 'react-native'

interface FormInputProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  error?: string
  focused: boolean
  onFocus: () => void
  onBlur: () => void
  keyboardType?: 'default' | 'email-address'
  autoCapitalize?: 'none' | 'sentences'
  autoComplete?: string
  editable?: boolean
}

export default function FormInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  focused,
  onFocus,
  onBlur,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true
}: FormInputProps) {
  const getBorderStyle = () => {
    if (focused) return 'border-primary-600 bg-primary-50'
    if (error) return 'border-red-500 bg-red-50'
    return 'border-neutral-300 bg-neutral-100'
  }

  return (
    <View className="mb-5">
      <Text className="text-body font-lufga-medium text-neutral-700 mb-2">
        {label}
      </Text>
      <View className={`border rounded-input px-4 py-4 ${getBorderStyle()}`}>
        <TextInput
          className="text-body font-lufga text-neutral-900"
          placeholder={placeholder}
          placeholderTextColor="#8C8C8C"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
        />
      </View>
      {error && (
        <Text className="text-red-500 text-body-sm font-lufga mt-1">
          {error}
        </Text>
      )}
    </View>
  )
}