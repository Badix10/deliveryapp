import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => Promise<void>, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [loading, setLoading] = useState(true)

  // Charger la valeur au montage
  useEffect(() => {
    const loadValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      } catch (error) {
        console.error(`Error loading ${key} from storage:`, error)
      } finally {
        setLoading(false)
      }
    }

    loadValue()
  }, [key])

  // Fonction pour sauvegarder
  const setValue = async (value: T) => {
    try {
      setStoredValue(value)
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error)
    }
  }

  return [storedValue, setValue, loading]
}