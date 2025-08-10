import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

interface PasswordInputProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  error?: string
  focused: boolean
  onFocus: () => void
  onBlur: () => void
  showPassword: boolean
  onTogglePassword: () => void
  editable?: boolean
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  focused,
  onFocus,
  onBlur,
  showPassword,
  onTogglePassword,
  editable = true
}: PasswordInputProps) {
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
      <View className={`border rounded-input px-4 py-4 flex-row items-center ${getBorderStyle()}`}>
        <TextInput
          className="flex-1 text-body font-lufga text-neutral-900"
          placeholder={placeholder}
          placeholderTextColor="#8C8C8C"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoComplete="password"
          onFocus={onFocus}
          onBlur={onBlur}
          editable={editable}
        />
        <TouchableOpacity
          onPress={onTogglePassword}
          className="ml-2 p-1"
        >
          <Icon 
            name={showPassword ? "eyeo" : "eye"} 
            size={20} 
            color="#8C8C8C"
          />
        </TouchableOpacity>
      </View>
      {error && (
        <Text className="text-red-500 text-body-sm font-lufga mt-1">
          {error}
        </Text>
      )}
    </View>
  )
}