import { create } from 'zustand'

// Types
type AuthMode = 'login' | 'signup' | 'forgot'

interface FormErrors {
  [field: string]: string
}

interface UIState {
  // Loading states
  isAppLoading: boolean
  
  // Auth UI state
  authMode: AuthMode
  showPassword: boolean
  showConfirmPassword: boolean
  
  // Form states
  formErrors: FormErrors
}

interface UIActions {
  // App actions
  setAppLoading: (isAppLoading: boolean) => void
  
  // Auth UI actions
  setAuthMode: (authMode: AuthMode) => void
  setShowPassword: (showPassword: boolean) => void
  setShowConfirmPassword: (showConfirmPassword: boolean) => void
  
  // Form error actions
  setFormErrors: (formErrors: FormErrors) => void
  clearFormErrors: () => void
  addFormError: (field: string, error: string) => void
  removeFormError: (field: string) => void
}

type UIStore = UIState & UIActions

export const useUIStore = create<UIStore>((set) => ({
  // ============================================
  // STATE
  // ============================================
  isAppLoading: true,
  authMode: 'login',
  showPassword: false,
  showConfirmPassword: false,
  formErrors: {},
  
  // ============================================
  // ACTIONS
  // ============================================
  setAppLoading: (isAppLoading: boolean) => set({ isAppLoading }),
  
  setAuthMode: (authMode: AuthMode) => set({ 
    authMode,
    formErrors: {},
    showPassword: false,
    showConfirmPassword: false 
  }),
  
  setShowPassword: (showPassword: boolean) => set({ showPassword }),
  setShowConfirmPassword: (showConfirmPassword: boolean) => set({ showConfirmPassword }),
  
  setFormErrors: (formErrors: FormErrors) => set({ formErrors }),
  clearFormErrors: () => set({ formErrors: {} }),
  
  addFormError: (field: string, error: string) => set((state) => ({
    formErrors: { ...state.formErrors, [field]: error }
  })),
  
  removeFormError: (field: string) => set((state) => {
    const { [field]: removed, ...rest } = state.formErrors
    return { formErrors: rest }
  }),
}))