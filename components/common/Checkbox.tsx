import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

interface CheckboxProps {
  checked: boolean
  onPress: () => void
}

export default function Checkbox({ checked, onPress }: CheckboxProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={`w-5 h-5 border rounded-xs items-center justify-center ${
        checked ? 'bg-primary-600 border-primary-600' : 'border-neutral-400'
      }`}>
        {checked && <Icon name="check" size={12} color="white" />}
      </View>
    </TouchableOpacity>
  )
}
