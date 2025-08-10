import type { Profile } from '@/database.types'
import { supabase } from '@/lib/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// Types pour les réponses d'authentification
interface AuthResponse {
  success: boolean
  error?: string
}

interface SignUpResponse extends AuthResponse {
  needsVerification?: boolean
  session?: Session | null
}

// Interface du state du store
interface AuthState {
  // State
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  rememberMe: boolean
}

// Interface des actions du store
interface AuthActions {
  // Setters
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  setSession: (session: Session | null) => void
  setLoading: (isLoading: boolean) => void
  setRememberMe: (rememberMe: boolean) => void
  
  // Auth Actions
  signIn: (email: string, password: string) => Promise<AuthResponse>
  signUp: (email: string, password: string, userData?: Partial<Profile>) => Promise<SignUpResponse>
  signOut: () => Promise<AuthResponse>
  resetPassword: (email: string) => Promise<AuthResponse>
  updateProfile: (updates: Partial<Profile>) => Promise<AuthResponse>
  
  // Utility Actions
  initialize: () => Promise<void>
  clearAuth: () => void
  loadProfile: () => Promise<void>
}

// Type combiné du store
type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // ============================================
      // STATE
      // ============================================
      user: null,
      profile: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
      rememberMe: false,
      
      // ============================================
      // SETTERS
      // ============================================
      setUser: (user: User | null) => {
        set({ 
          user, 
          isAuthenticated: !!user 
        })
      },
      
      setProfile: (profile: Profile | null) => {
        set({ profile })
      },
      
      setSession: (session: Session | null) => {
        set({ 
          session, 
          user: session?.user || null,
          isAuthenticated: !!session?.user 
        })
        
        // Charger le profil si on a une session
        if (session?.user) {
          get().loadProfile()
        }
      },
      
      setLoading: (isLoading: boolean) => {
        set({ isLoading })
      },
      
      setRememberMe: (rememberMe: boolean) => {
        set({ rememberMe })
      },
      
      // ============================================
      // AUTH ACTIONS
      // ============================================
      signIn: async (email: string, password: string): Promise<AuthResponse> => {
        set({ isLoading: true })
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (error) throw error
          
          set({ 
            user: data.user,
            session: data.session,
            isAuthenticated: true,
            isLoading: false 
          })
          
          // Charger le profil après connexion
          await get().loadProfile()
          
          return { success: true }
        } catch (error: any) {
          set({ isLoading: false })
          return { 
            success: false, 
            error: error?.message || 'Erreur de connexion' 
          }
        }
      },
      
      signUp: async (
        email: string, 
        password: string, 
        userData: Partial<Profile> = {}
      ): Promise<SignUpResponse> => {
        set({ isLoading: true })
        
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: userData
            }
          })
          
          if (error) throw error
          
          set({ isLoading: false })
          
          // Si on a une session, charger le profil
          if (data.session?.user) {
            set({
              user: data.session.user,
              session: data.session,
              isAuthenticated: true
            })
            await get().loadProfile()
          }
          
          return { 
            success: true, 
            needsVerification: !data.session,
            session: data.session 
          }
        } catch (error: any) {
          set({ isLoading: false })
          return { 
            success: false, 
            error: error?.message || 'Erreur d\'inscription' 
          }
        }
      },
      
      signOut: async (): Promise<AuthResponse> => {
        set({ isLoading: true })
        
        try {
          const { error } = await supabase.auth.signOut()
          if (error) throw error
          
          set({ 
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            isLoading: false 
          })
          
          return { success: true }
        } catch (error: any) {
          set({ isLoading: false })
          return { 
            success: false, 
            error: error?.message || 'Erreur de déconnexion' 
          }
        }
      },
      
      resetPassword: async (email: string): Promise<AuthResponse> => {
        set({ isLoading: true })
        
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email)
          if (error) throw error
          
          set({ isLoading: false })
          return { success: true }
        } catch (error: any) {
          set({ isLoading: false })
          return { 
            success: false, 
            error: error?.message || 'Erreur de réinitialisation' 
          }
        }
      },
      
      updateProfile: async (updates: Partial<Profile>): Promise<AuthResponse> => {
        const { user } = get()
        if (!user) {
          return { success: false, error: 'Utilisateur non connecté' }
        }
        
        set({ isLoading: true })
        
        try {
          const { data, error } = await supabase
            .from('profiles')
            .update({
              ...updates,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
            .select()
            .single()
          
          if (error) throw error
          
          set({ 
            profile: data,
            isLoading: false 
          })
          
          return { success: true }
        } catch (error: any) {
          set({ isLoading: false })
          return { 
            success: false, 
            error: error?.message || 'Erreur de mise à jour du profil' 
          }
        }
      },
      
      // ============================================
      // UTILITY ACTIONS
      // ============================================
      initialize: async (): Promise<void> => {
        set({ isLoading: true })
        
        try {
          const { data: { session } } = await supabase.auth.getSession()
          
          set({ 
            session,
            user: session?.user || null,
            isAuthenticated: !!session?.user,
            isLoading: false 
          })
          
          // Charger le profil si on a une session
          if (session?.user) {
            await get().loadProfile()
          }
        } catch (error) {
          console.error('Erreur d\'initialisation:', error)
          set({ 
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            isLoading: false 
          })
        }
      },
      
      loadProfile: async (): Promise<void> => {
        const { user } = get()
        if (!user) return
        
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          if (error) {
            // Si le profil n'existe pas, le créer
            if (error.code === 'PGRST116') {
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert({
                  id: user.id,
                  username: user.user_metadata?.username,
                  full_name: user.user_metadata?.full_name,
                  avatar_url: user.user_metadata?.avatar_url,
                  preferred_language: 'fr' // Langue par défaut
                })
                .select()
                .single()
              
              if (createError) throw createError
              set({ profile: newProfile })
            } else {
              throw error
            }
          } else {
            set({ profile: data })
          }
        } catch (error) {
          console.error('Erreur de chargement du profil:', error)
        }
      },
      
      clearAuth: (): void => {
        set({ 
          user: null,
          profile: null,
          session: null,
          isAuthenticated: false,
          isLoading: false 
        })
      },
    }),
    {
      name: 'makla-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Persister seulement les données importantes
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    }
  )
)