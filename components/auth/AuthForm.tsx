import FormInput from '@/components/auth/FormInput'
import PasswordInput from '@/components/auth/PasswordInput'
import RememberMeSection from '@/components/auth/RememberMeSection'
import SocialAuthButtons from '@/components/auth/SocialAuthButton'
import TermsSection from '@/components/auth/TermsSection'
import { useToggle } from '@/hooks'
import { useUIStore } from '@/stores/uiStore'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'


interface AuthFormProps {
  formState: any
  validation: any
  isSignUp: boolean
  isLoading: boolean
  onSubmit: () => void
}

export default function AuthForm({
  formState,
  validation,
  isSignUp,
  isLoading,
  onSubmit
}: AuthFormProps) {
  const { formErrors } = useUIStore()
  const [showPassword, toggleShowPassword] = useToggle(false)
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false)

  return (
    <>
      {/* Email Field */}
      <FormInput
        label="Email Address"
        placeholder="Enter your email address"
        value={formState.email}
        onChangeText={(text) => {
          formState.setEmail(text)
          if (formErrors.email) validation.removeFormError('email')
        }}
        error={formErrors.email}
        focused={formState.emailFocused}
        onFocus={() => formState.setEmailFocused(true)}
        onBlur={() => {
          formState.setEmailFocused(false)
          if (formState.email) validation.validateEmail(formState.email)
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        editable={!isLoading}
      />

      {/* Password Field */}
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={formState.password}
        onChangeText={(text) => {
          formState.setPassword(text)
          if (formErrors.password) validation.removeFormError('password')
        }}
        error={formErrors.password}
        focused={formState.passwordFocused}
        onFocus={() => formState.setPasswordFocused(true)}
        onBlur={() => {
          formState.setPasswordFocused(false)
          if (formState.password) validation.validatePassword(formState.password)
        }}
        showPassword={showPassword}
        onTogglePassword={toggleShowPassword}
        editable={!isLoading}
      />

      {/* Confirm Password (Sign Up only) */}
      {isSignUp && (
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formState.confirmPassword}
          onChangeText={(text) => {
            formState.setConfirmPassword(text)
            if (formErrors.confirmPassword) validation.removeFormError('confirmPassword')
          }}
          error={formErrors.confirmPassword}
          focused={formState.confirmPasswordFocused}
          onFocus={() => formState.setConfirmPasswordFocused(true)}
          onBlur={() => {
            formState.setConfirmPasswordFocused(false)
            if (formState.confirmPassword) {
              validation.validateConfirmPassword(formState.password, formState.confirmPassword)
            }
          }}
          showPassword={showConfirmPassword}
          onTogglePassword={toggleShowConfirmPassword}
          editable={!isLoading}
        />
      )}

      {/* Remember Me / Terms */}
      {!isSignUp ? (
        <RememberMeSection
          rememberMe={formState.rememberMe}
          setRememberMe={formState.setRememberMe}
        />
      ) : (
        <TermsSection
          agreeTerms={formState.agreeTerms}
          setAgreeTerms={formState.setAgreeTerms}
          error={formErrors.terms}
          onErrorClear={() => validation.removeFormError('terms')}
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity
        onPress={onSubmit}
        disabled={isLoading}
        className={`rounded-button py-4 mb-6 ${isLoading ? 'bg-primary-300' : 'bg-primary-600'
          }`}
        style={{
          shadowColor: '#006233',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 3
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-center text-white font-lufga-semibold text-body">
            {isSignUp ? 'Sign Up' : 'Login'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Social Auth */}
      <SocialAuthButtons isSignUp={isSignUp} />
    </>
  )
}