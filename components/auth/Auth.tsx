import { useAuthForm } from '@/hooks/useAuthForm'
import { useAuthValidation } from '@/hooks/useAuthValidation'
import React, { useEffect } from 'react'
import {
  Alert,
  AppState,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from 'react-native'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { useUIStore } from '../../stores/uiStore'
import AuthForm from './AuthForm'
import AuthHeader from './AuthHeader'
import AuthModeSwitch from './AuthModeSwitch'


const { width: screenWidth } = Dimensions.get('window')

// Gestion du rafraîchissement automatique de la session
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function AuthV2() {
  const { signIn, signUp, isLoading } = useAuthStore()
  const { authMode, clearFormErrors } = useUIStore()
  
  const formState = useAuthForm()
  const validation = useAuthValidation()
  
  const isSignUp = authMode === 'signup'

  // Clear errors when switching modes
  useEffect(() => {
    clearFormErrors()
  }, [authMode, clearFormErrors])

  const handleSignIn = async () => {
    clearFormErrors()
    
    const isEmailValid = validation.validateEmail(formState.email)
    const isPasswordValid = validation.validatePassword(formState.password)
    
    if (!isEmailValid || !isPasswordValid) return

    const result = await signIn(formState.email, formState.password)
    
    if (!result.success) {
      Alert.alert('Erreur de connexion', result.error)
    }
  }

  const handleSignUp = async () => {
    clearFormErrors()
    
    const isEmailValid = validation.validateEmail(formState.email)
    const isPasswordValid = validation.validatePassword(formState.password)
    const isConfirmPasswordValid = validation.validateConfirmPassword(
      formState.password, 
      formState.confirmPassword
    )
    
    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) return

    if (!formState.agreeTerms) {
      validation.addFormError('terms', 'Veuillez accepter les conditions d\'utilisation')
      return
    }

    const result = await signUp(formState.email, formState.password)
    
    if (!result.success) {
      Alert.alert('Erreur d\'inscription', result.error)
    } else if (result.needsVerification) {
      Alert.alert(
        'Vérification requise', 
        'Veuillez vérifier votre boîte mail pour confirmer votre inscription!'
      )
    }
  }

  return (
    <View className="flex-1 bg-white">
      <AuthHeader screenWidth={screenWidth} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 py-8" style={{ width: screenWidth }}>
            <AuthForm
              formState={formState}
              validation={validation}
              isSignUp={isSignUp}
              isLoading={isLoading}
              onSubmit={isSignUp ? handleSignUp : handleSignIn}
            />
            
            <AuthModeSwitch isSignUp={isSignUp} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}