import { useForm, useToggle } from '@/hooks'

interface AuthFormValues {
  email: string
  password: string
  confirmPassword: string
  rememberMe: boolean
  agreeTerms: boolean
}

// Validations intégrées
const validateAuthForm = (values: AuthFormValues) => {
  const errors: Partial<Record<keyof AuthFormValues, string>> = {}
  
  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!values.email) {
    errors.email = 'L\'email est requis'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Format d\'email invalide'
  }
  
  // Validation password
  if (!values.password) {
    errors.password = 'Le mot de passe est requis'
  } else if (values.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères'
  }
  
  // Validation confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'La confirmation du mot de passe est requise'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas'
  }
  
  return errors
}

export function useAuthForm(onSubmit?: (values: AuthFormValues) => Promise<void>) {
  // Utiliser notre hook useForm pour la logique principale
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      agreeTerms: false
    },
    validate: validateAuthForm,
    onSubmit
  })

  // Focus states avec useToggle
  const [emailFocused, toggleEmailFocus, setEmailFocused] = useToggle(false)
  const [passwordFocused, togglePasswordFocus, setPasswordFocused] = useToggle(false)
  const [confirmPasswordFocused, toggleConfirmPasswordFocus, setConfirmPasswordFocused] = useToggle(false)

  const resetFocus = () => {
    setEmailFocused(false)
    setPasswordFocused(false)
    setConfirmPasswordFocused(false)
  }

  // Compatibilité avec l'API existante
  return {
    // Valeurs
    email: form.values.email,
    password: form.values.password,
    confirmPassword: form.values.confirmPassword,
    rememberMe: form.values.rememberMe,
    agreeTerms: form.values.agreeTerms,
    
    // Setters compatibles
    setEmail: (value: string) => form.setFieldValue('email', value),
    setPassword: (value: string) => form.setFieldValue('password', value),
    setConfirmPassword: (value: string) => form.setFieldValue('confirmPassword', value),
    setRememberMe: (value: boolean) => form.setFieldValue('rememberMe', value),
    setAgreeTerms: (value: boolean) => form.setFieldValue('agreeTerms', value),
    
    // Focus states
    emailFocused,
    setEmailFocused,
    passwordFocused,
    setPasswordFocused,
    confirmPasswordFocused,
    setConfirmPasswordFocused,
    resetFocus,
    
    // Nouvelles fonctionnalités depuis useForm
    errors: form.errors,
    touched: form.touched,
    isSubmitting: form.isSubmitting,
    handleSubmit: form.handleSubmit,
    setFieldTouched: form.setFieldTouched,
    reset: form.reset,
    
    // Validation helpers
    validateField: (field: keyof AuthFormValues) => {
      const errors = validateAuthForm(form.values)
      return !errors[field]
    }
  }
}