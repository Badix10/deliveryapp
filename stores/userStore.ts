import type { Profile } from '@/database.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// Types
type Theme = 'light' | 'dark'
type Language = 'ar' | 'fr'

interface UserPreferences {
  theme: Theme
  language: Language
  notifications: boolean
}

interface UpdateResponse {
  success: boolean
  error?: string
}

interface UserState {
  // User profile data
  profile: Profile | null
  preferences: UserPreferences
}

interface UserActions {
  // Profile actions
  setProfile: (profile: Profile | null) => void
  updateProfile: (updates: Partial<Profile>) => Promise<UpdateResponse>
  
  // Preferences actions
  setPreferences: (preferences: UserPreferences) => void
  updatePreference: <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => void
  
  // Language specific action for better integration with i18n
  setLanguage: (language: Language) => void
  
  // Utility actions
  clearUserData: () => void
}

type UserStore = UserState & UserActions

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // ============================================
      // STATE
      // ============================================
      profile: null,
      preferences: {
        theme: 'light',
        language: 'fr',
        notifications: true,
      },
      
      // ============================================
      // ACTIONS
      // ============================================
      setProfile: (profile: Profile | null) => set({ profile }),
      
      updateProfile: async (updates: Partial<Profile>): Promise<UpdateResponse> => {
        try {
          const currentProfile = get().profile
          if (!currentProfile) {
            return { success: false, error: 'Aucun profil trouvé' }
          }
          
          // Appel API pour mettre à jour le profil
          const updatedProfile: Profile = { 
            ...currentProfile, 
            ...updates,
            updated_at: new Date().toISOString()
          }
          
          set({ profile: updatedProfile })
          return { success: true }
        } catch (error: any) {
          return { 
            success: false, 
            error: error?.message || 'Erreur de mise à jour du profil' 
          }
        }
      },
      
      setPreferences: (preferences: UserPreferences) => set({ preferences }),
      
      updatePreference: <K extends keyof UserPreferences>(
        key: K, 
        value: UserPreferences[K]
      ) => set((state) => ({
        preferences: { ...state.preferences, [key]: value }
      })),
      
      setLanguage: (language: Language) => set((state) => ({
        preferences: { ...state.preferences, language }
      })),
      
      clearUserData: () => set({ 
        profile: null,
        preferences: {
          theme: 'light',
          language: 'fr',
          notifications: true,
        }
      }),
    }),
    {
      name: 'makla-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Persister tout le state
      partialize: (state) => ({
        profile: state.profile,
        preferences: state.preferences,
      }),
    }
  )
)