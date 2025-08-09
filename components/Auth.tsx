import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  AppState,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { supabase } from '../lib/supabase'

// Gestion du rafraîchissement automatique de la session
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert('Erreur', error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert('Erreur', error.message)
    if (!session) Alert.alert('Vérification', 'Veuillez vérifier votre boîte mail pour confirmer votre inscription!')
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Logo ou titre de l'app */}
          <View className="items-center mb-10">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenue
            </Text>
            <Text className="text-base text-gray-600">
              Connectez-vous pour continuer
            </Text>
          </View>

          {/* Champ Email */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email
            </Text>
            <View className={`flex-row items-center border rounded-lg px-4 py-3 ${
              emailFocused ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
            }`}>
              <Text className="mr-3 text-gray-500">📧</Text>
              <TextInput
                className="flex-1 text-base text-gray-900"
                placeholder="email@address.com"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                editable={!loading}
              />
            </View>
          </View>

          {/* Champ Password */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </Text>
            <View className={`flex-row items-center border rounded-lg px-4 py-3 ${
              passwordFocused ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
            }`}>
              <Text className="mr-3 text-gray-500">🔒</Text>
              <TextInput
                className="flex-1 text-base text-gray-900"
                placeholder="Mot de passe"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                autoComplete="password"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                editable={!loading}
              />
            </View>
          </View>

          {/* Bouton Se connecter */}
          <TouchableOpacity
            onPress={signInWithEmail}
            disabled={loading}
            className={`rounded-lg py-4 mb-3 ${
              loading ? 'bg-blue-300' : 'bg-blue-600 active:bg-blue-700'
            }`}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-white font-semibold text-base">
                Se connecter
              </Text>
            )}
          </TouchableOpacity>

          {/* Séparateur */}
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">ou</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Bouton S'inscrire */}
          <TouchableOpacity
            onPress={signUpWithEmail}
            disabled={loading}
            className={`rounded-lg py-4 border ${
              loading 
                ? 'border-gray-300 bg-gray-50' 
                : 'border-blue-600 bg-white active:bg-gray-50'
            }`}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#2563EB" />
            ) : (
              <Text className="text-center text-blue-600 font-semibold text-base">
                Créer un compte
              </Text>
            )}
          </TouchableOpacity>

          {/* Lien mot de passe oublié (optionnel) */}
          <TouchableOpacity className="mt-4">
            <Text className="text-center text-sm text-blue-600">
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}