import { useFonts } from 'expo-font';

export const useFontsLoading = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Lufga': require('../assets/fonts/lufga/LufgaRegular.ttf'),
    'Lufga-Medium': require('../assets/fonts/lufga/LufgaMedium.ttf'),
    'Lufga-SemiBold': require('../assets/fonts/lufga/LufgaSemiBold.ttf'),
    'Lufga-Bold': require('../assets/fonts/lufga/LufgaBold.ttf'),
  });

  return { fontsLoaded, fontError };
};