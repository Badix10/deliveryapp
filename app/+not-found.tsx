import { Link, Stack } from 'expo-router';
import { SafeAreaView, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-primary items-center justify-center px-6">
        <Text className="text-white text-7xl font-extrabold mb-4">
          404
        </Text>

        <Text className="text-white text-center text-lg mb-8">
          Oups… La page que vous recherchez n’existe pas.
        </Text>

        <Link
          href="/"
          className="bg-accent px-8 py-3 rounded-full shadow-lg"
        >
          <Text className="text-white text-base font-medium">
            Retour à l’accueil
          </Text>
        </Link>
      </SafeAreaView>
    </>
  );
}