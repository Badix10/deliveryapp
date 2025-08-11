import { useState } from 'react'

export function useAuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const resetFocus = () => {
    setEmailFocused(false)
    setPasswordFocused(false)
    setConfirmPasswordFocused(false)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    emailFocused,
    setEmailFocused,
    passwordFocused,
    setPasswordFocused,
    confirmPasswordFocused,
    setConfirmPasswordFocused,
    rememberMe,
    setRememberMe,
    agreeTerms,
    setAgreeTerms,
    resetFocus
  }
}