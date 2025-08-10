import { useUIStore } from "@/stores/uiStore"


export function useAuthValidation() {
  const { addFormError, removeFormError } = useUIStore()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      addFormError('email', 'L\'email est requis')
      return false
    }
    if (!emailRegex.test(email)) {
      addFormError('email', 'Format d\'email invalide')
      return false
    }
    removeFormError('email')
    return true
  }

  const validatePassword = (password: string): boolean => {
    if (!password) {
      addFormError('password', 'Le mot de passe est requis')
      return false
    }
    if (password.length < 6) {
      addFormError('password', 'Le mot de passe doit contenir au moins 6 caractères')
      return false
    }
    removeFormError('password')
    return true
  }

  const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    if (!confirmPassword) {
      addFormError('confirmPassword', 'La confirmation du mot de passe est requise')
      return false
    }
    if (password !== confirmPassword) {
      addFormError('confirmPassword', 'Les mots de passe ne correspondent pas')
      return false
    }
    removeFormError('confirmPassword')
    return true
  }

  return {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    addFormError,
    removeFormError
  }
}