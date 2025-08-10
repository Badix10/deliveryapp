import { Database } from '@/database.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sifkoughrducygnhkngx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZmtvdWdocmR1Y3lnbmhrbmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NDU1MDYsImV4cCI6MjA3MDIyMTUwNn0.4q1til0wvoaQ2jirEFrQILVMONiSBvJVga2ntUwXlYY"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
