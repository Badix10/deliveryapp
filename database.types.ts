export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          role: 'customer' | 'delivery_person' | 'restaurant_owner' | 'admin'
          preferred_language: 'ar' | 'fr' | 'en'
          is_active: boolean
          phone_number: string | null
          default_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          role?: 'customer' | 'delivery_person' | 'restaurant_owner' | 'admin'
          preferred_language?: 'ar' | 'fr' | 'en'
          is_active?: boolean
          phone_number?: string | null
          default_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          role?: 'customer' | 'delivery_person' | 'restaurant_owner' | 'admin'
          preferred_language?: 'ar' | 'fr' | 'en'
          is_active?: boolean
          phone_number?: string | null
          default_address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string | null
          city: string
          address: string
          latitude: number | null
          longitude: number | null
          phone_number: string
          logo_url: string | null
          opening_hours: {
            [key: string]: {
              open: string
              close: string
            }
          } | null
          is_open: boolean
          is_active: boolean
          delivery_fee: number
          minimum_order: number
          preparation_time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description?: string | null
          city: string
          address: string
          latitude?: number | null
          longitude?: number | null
          phone_number: string
          logo_url?: string | null
          opening_hours?: {
            [key: string]: {
              open: string
              close: string
            }
          } | null
          is_open?: boolean
          is_active?: boolean
          delivery_fee?: number
          minimum_order?: number
          preparation_time?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string | null
          city?: string
          address?: string
          latitude?: number | null
          longitude?: number | null
          phone_number?: string
          logo_url?: string | null
          opening_hours?: {
            [key: string]: {
              open: string
              close: string
            }
          } | null
          is_open?: boolean
          is_active?: boolean
          delivery_fee?: number
          minimum_order?: number
          preparation_time?: number
          created_at?: string
          updated_at?: string
        }
      }
      product_categories: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          name_ar: string | null
          name_en: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          name_ar?: string | null
          name_en?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          name_ar?: string | null
          name_en?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          restaurant_id: string
          category_id: string | null
          name: string
          name_ar: string | null
          name_en: string | null
          description: string | null
          description_ar: string | null
          description_en: string | null
          price: number
          image_url: string | null
          ingredients: string[] | null
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          category_id?: string | null
          name: string
          name_ar?: string | null
          name_en?: string | null
          description?: string | null
          description_ar?: string | null
          description_en?: string | null
          price: number
          image_url?: string | null
          ingredients?: string[] | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          category_id?: string | null
          name?: string
          name_ar?: string | null
          name_en?: string | null
          description?: string | null
          description_ar?: string | null
          description_en?: string | null
          price?: number
          image_url?: string | null
          ingredients?: string[] | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_id: string
          restaurant_id: string
          delivery_person_id: string | null
          delivery_address: string
          delivery_latitude: number | null
          delivery_longitude: number | null
          delivery_instructions: string | null
          status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
          subtotal: number
          delivery_fee: number
          total_amount: number
          payment_method: string
          payment_status: 'pending' | 'paid'
          created_at: string
          confirmed_at: string | null
          ready_at: string | null
          delivered_at: string | null
          cancelled_at: string | null
          customer_note: string | null
          cancellation_reason: string | null
        }
        Insert: {
          id?: string
          order_number?: string
          customer_id: string
          restaurant_id: string
          delivery_person_id?: string | null
          delivery_address: string
          delivery_latitude?: number | null
          delivery_longitude?: number | null
          delivery_instructions?: string | null
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
          subtotal: number
          delivery_fee?: number
          total_amount: number
          payment_method?: string
          payment_status?: 'pending' | 'paid'
          created_at?: string
          confirmed_at?: string | null
          ready_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
          customer_note?: string | null
          cancellation_reason?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          customer_id?: string
          restaurant_id?: string
          delivery_person_id?: string | null
          delivery_address?: string
          delivery_latitude?: number | null
          delivery_longitude?: number | null
          delivery_instructions?: string | null
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
          subtotal?: number
          delivery_fee?: number
          total_amount?: number
          payment_method?: string
          payment_status?: 'pending' | 'paid'
          created_at?: string
          confirmed_at?: string | null
          ready_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
          customer_note?: string | null
          cancellation_reason?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          special_instructions: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          special_instructions?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          special_instructions?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      restaurant_stats: {
        Row: {
          restaurant_id: string
          name: string
          total_orders: number | null
          orders_today: number | null
          total_revenue: number | null
          average_order_value: number | null
        }
      }
    }
    Functions: {
      // Les fonctions personnalisées si vous en avez
    }
    Enums: {
      user_role: 'customer' | 'delivery_person' | 'restaurant_owner' | 'admin'
      order_status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
      payment_status: 'pending' | 'paid'
      language: 'ar' | 'fr' | 'en'
    }
  }
}

// ============================================
// TYPES DÉRIVÉS POUR FACILITER L'UTILISATION
// ============================================

// Types des tables
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Restaurant = Database['public']['Tables']['restaurants']['Row']
export type RestaurantInsert = Database['public']['Tables']['restaurants']['Insert']
export type RestaurantUpdate = Database['public']['Tables']['restaurants']['Update']

export type ProductCategory = Database['public']['Tables']['product_categories']['Row']
export type ProductCategoryInsert = Database['public']['Tables']['product_categories']['Insert']
export type ProductCategoryUpdate = Database['public']['Tables']['product_categories']['Update']

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export type Order = Database['public']['Tables']['orders']['Row']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']

export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']
export type OrderItemUpdate = Database['public']['Tables']['order_items']['Update']

// Types des vues
export type RestaurantStats = Database['public']['Views']['restaurant_stats']['Row']

// Types des enums
export type UserRole = Database['public']['Enums']['user_role']
export type OrderStatus = Database['public']['Enums']['order_status']
export type PaymentStatus = Database['public']['Enums']['payment_status']
export type Language = Database['public']['Enums']['language']

// ============================================
// TYPES COMPOSITES POUR L'APPLICATION
// ============================================

// Restaurant avec ses statistiques
export interface RestaurantWithStats extends Restaurant {
  stats?: RestaurantStats
}

// Produit avec sa catégorie
export interface ProductWithCategory extends Product {
  category?: ProductCategory
}

// Commande complète avec détails
export interface OrderWithDetails extends Order {
  restaurant?: Restaurant
  customer?: Profile
  delivery_person?: Profile
  items?: OrderItemWithProduct[]
}

// Item de commande avec détails du produit
export interface OrderItemWithProduct extends OrderItem {
  product?: Product
}

// Panier (côté client avant création de commande)
export interface CartItem {
  product: Product
  quantity: number
  special_instructions?: string
}

export interface Cart {
  restaurant: Restaurant
  items: CartItem[]
  subtotal: number
  delivery_fee: number
  total: number
}

// Types pour les formulaires
export interface CreateOrderData {
  restaurant_id: string
  delivery_address: string
  delivery_instructions?: string
  customer_note?: string
  items: {
    product_id: string
    quantity: number
    special_instructions?: string
  }[]
}

// Types pour les filtres et recherches
export interface RestaurantFilters {
  city?: string
  is_open?: boolean
  search?: string
  min_order?: number
  max_delivery_fee?: number
}

export interface ProductFilters {
  category_id?: string
  is_available?: boolean
  min_price?: number
  max_price?: number
  search?: string
}

// Types pour les réponses API
export interface ApiResponse<T> {
  data: T | null
  error: Error | null
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}

// Types pour les statistiques
export interface DashboardStats {
  totalOrders: number
  todayOrders: number
  totalRevenue: number
  averageOrderValue: number
  topProducts: Product[]
  recentOrders: Order[]
}

// Types pour les horaires d'ouverture
export interface OpeningHours {
  [day: string]: {
    open: string
    close: string
  } | null
}

export interface DaySchedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  open: string
  close: string
  isClosed: boolean
}