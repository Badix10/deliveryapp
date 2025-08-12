import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

const FONT_CONFIG = {
  'Lufga': require('../assets/fonts/lufga/LufgaRegular.ttf'),
  'Lufga-Medium': require('../assets/fonts/lufga/LufgaMedium.ttf'),
  'Lufga-SemiBold': require('../assets/fonts/lufga/LufgaSemiBold.ttf'),
  'Lufga-Bold': require('../assets/fonts/lufga/LufgaBold.ttf'),
}

export const useFontsLoading = () => {
  const [fontsLoaded, fontError] = useFonts(FONT_CONFIG)

  // Gérer les erreurs de fonts
  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError)
      throw fontError // Propager l'erreur pour que _layout.tsx puisse la gérer
    }
  }, [fontError])

  // Gérer le splash screen automatiquement
  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded && !fontError) {
        await SplashScreen.hideAsync()
      }
    }

    hideSplashScreen()
  }, [fontsLoaded, fontError])

  return { 
    fontsLoaded, 
    fontError,
    isReady: fontsLoaded && !fontError 
  }
}