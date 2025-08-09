import LoadingScreen from '@/components/LoadingScreen';
import '@/global.css';
import { Session } from '@supabase/supabase-js';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  // Chargement des fonts
  const [fontsLoaded, fontError] = useFonts({
    'Lufga': require('../assets/fonts/lufga/LufgaRegular.ttf'),
    'Lufga-Medium': require('../assets/fonts/lufga/LufgaMedium.ttf'),
    'Lufga-SemiBold': require('../assets/fonts/lufga/LufgaSemiBold.ttf'),
    'Lufga-Bold': require('../assets/fonts/lufga/LufgaBold.ttf'),
  });

  // Gestion de la session Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Gestion des erreurs de fonts
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Cache le splash screen quand tout est prêt
  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  // Navigation basée sur l'authentification
  useEffect(() => {
    if (loading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [session, segments, loading, fontsLoaded]);

  // Utilisation du composant LoadingScreen
  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}