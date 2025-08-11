import { Restaurant } from '@/database.types';
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useLocationStore } from './locationStore';

interface RestaurantWithDistance extends Restaurant {
  distance?: number; // Distance en km
  rating?: number; // Note moyenne
  totalReviews?: number; // Nombre d'avis
}

interface RestaurantsStore {
  restaurants: RestaurantWithDistance[];
  nearbyRestaurants: RestaurantWithDistance[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchNearbyRestaurants: () => Promise<void>;
  fetchAllRestaurants: () => Promise<void>;
  toggleFavorite: (restaurantId: string) => void;
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
}

export const useRestaurantsStore = create<RestaurantsStore>((set, get) => ({
  restaurants: [],
  nearbyRestaurants: [],
  isLoading: false,
  error: null,

  // Calcul de la distance entre deux points (formule de Haversine)
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  fetchNearbyRestaurants: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Obtenir la localisation actuelle
      const { currentLocation } = useLocationStore.getState();
      const userLat = currentLocation.latitude || 36.7538;
      const userLon = currentLocation.longitude || 3.0588;

      // Requête Supabase
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('is_active', true)
        .eq('is_open', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Calculer la distance et ajouter des données supplémentaires
        const restaurantsWithDistance = data.map(restaurant => {
          const distance = restaurant.latitude && restaurant.longitude
            ? get().calculateDistance(userLat, userLon, restaurant.latitude, restaurant.longitude)
            : 999;
          
          return {
            ...restaurant,
            distance: parseFloat(distance.toFixed(1)),
            rating: 4.5 + Math.random() * 0.5, // Mock rating entre 4.5 et 5
            totalReviews: Math.floor(Math.random() * 500) + 50,
          };
        });

        // Trier par distance et prendre les 10 plus proches
        const sortedByDistance = restaurantsWithDistance
          .sort((a, b) => (a.distance || 999) - (b.distance || 999))
          .slice(0, 10);

        set({ 
          nearbyRestaurants: getMockRestaurants(),
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
      
      // Utiliser les données mock en cas d'erreur
      const mockRestaurants = getMockRestaurants();
      set({ 
        nearbyRestaurants: mockRestaurants,
        error: 'Using offline data',
        isLoading: false,
      });
    }
  },

  fetchAllRestaurants: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ 
        restaurants: data || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      set({ 
        restaurants: getMockRestaurants(),
        error: 'Failed to load restaurants',
        isLoading: false,
      });
    }
  },

  toggleFavorite: (restaurantId) => {
    // Implémenter la logique des favoris
    console.log('Toggle favorite for:', restaurantId);
  },
}));

// Fonction pour obtenir les restaurants mock
function getMockRestaurants(): RestaurantWithDistance[] {
  return [
  {
    id: 'rest-001',
    owner_id: 'owner-001',
    name: 'Burger Palace',
    description: 'Les meilleurs burgers artisanaux de la ville',
    city: 'Alger',
    address: '123 Rue Didouche Mourad, Alger',
    latitude: 36.7538,
    longitude: 3.0588,
    phone_number: '+213 555 0001',
    logo_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    opening_hours: {
      monday: { open: '10:00', close: '23:00' },
      tuesday: { open: '10:00', close: '23:00' },
      wednesday: { open: '10:00', close: '23:00' },
      thursday: { open: '10:00', close: '23:00' },
      friday: { open: '10:00', close: '00:00' },
      saturday: { open: '10:00', close: '00:00' },
      sunday: { open: '11:00', close: '22:00' },
    },
    is_open: true,
    is_active: true,
    delivery_fee: 200,
    minimum_order: 1000,
    preparation_time: 25,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    distance: 1.2,
    rating: 4.8,
    totalReviews: 324,
  },
  {
    id: 'rest-002',
    owner_id: 'owner-002',
    name: 'Pizza Express',
    description: 'Pizza authentique au feu de bois',
    city: 'Alger',
    address: '456 Boulevard Mohamed V, Alger',
    latitude: 36.7600,
    longitude: 3.0500,
    phone_number: '+213 555 0002',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    opening_hours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '00:00' },
      saturday: { open: '11:00', close: '00:00' },
      sunday: { open: '11:00', close: '23:00' },
    },
    is_open: true,
    is_active: true,
    delivery_fee: 250,
    minimum_order: 1500,
    preparation_time: 30,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    distance: 2.5,
    rating: 4.6,
    totalReviews: 256,
  },
  {
    id: 'rest-003',
    owner_id: 'owner-003',
    name: 'Sushi Master',
    description: 'Sushi frais préparé par des chefs japonais',
    city: 'Alger',
    address: '789 Rue Ben M\'hidi, Alger',
    latitude: 36.7700,
    longitude: 3.0600,
    phone_number: '+213 555 0003',
    logo_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    opening_hours: {
      monday: { open: '12:00', close: '22:00' },
      tuesday: { open: '12:00', close: '22:00' },
      wednesday: { open: '12:00', close: '22:00' },
      thursday: { open: '12:00', close: '22:00' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '22:00' },
    },
    is_open: true,
    is_active: true,
    delivery_fee: 300,
    minimum_order: 2000,
    preparation_time: 35,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    distance: 0.8,
    rating: 4.9,
    totalReviews: 189,
  },
  {
    id: 'rest-004',
    owner_id: 'owner-004',
    name: 'Le Petit Café',
    description: 'Petit-déjeuner et brunch toute la journée',
    city: 'Alger',
    address: '321 Avenue de l\'Indépendance, Alger',
    latitude: 36.7450,
    longitude: 3.0520,
    phone_number: '+213 555 0004',
    logo_url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
    opening_hours: {
      monday: { open: '07:00', close: '20:00' },
      tuesday: { open: '07:00', close: '20:00' },
      wednesday: { open: '07:00', close: '20:00' },
      thursday: { open: '07:00', close: '20:00' },
      friday: { open: '07:00', close: '21:00' },
      saturday: { open: '08:00', close: '21:00' },
      sunday: { open: '08:00', close: '20:00' },
    },
    is_open: true,
    is_active: true,
    delivery_fee: 150,
    minimum_order: 800,
    preparation_time: 20,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
    distance: 3.2,
    rating: 4.7,
    totalReviews: 412,
  },
  {
    id: 'rest-005',
    owner_id: 'owner-005',
    name: 'Tacos Fiesta',
    description: 'Tacos mexicains authentiques',
    city: 'Alger',
    address: '654 Rue Larbi Ben M\'hidi, Alger',
    latitude: 36.7650,
    longitude: 3.0450,
    phone_number: '+213 555 0005',
    logo_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    opening_hours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '00:00' },
      saturday: { open: '11:00', close: '00:00' },
      sunday: { open: '12:00', close: '22:00' },
    },
    is_open: true,
    is_active: true,
    delivery_fee: 200,
    minimum_order: 1200,
    preparation_time: 25,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
    distance: 1.8,
    rating: 4.5,
    totalReviews: 278,
  },
  {
    id: 'rest-006',
    owner_id: 'owner-006',
    name: 'Pasta Paradise',
    description: 'Pâtes fraîches faites maison',
    city: 'Alger',
    address: '987 Boulevard Krim Belkacem, Alger',
    latitude: 36.7480,
    longitude: 3.0610,
    phone_number: '+213 555 0006',
    logo_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    opening_hours: {
      monday: { open: '12:00', close: '22:00' },
      tuesday: { open: '12:00', close: '22:00' },
      wednesday: { open: '12:00', close: '22:00' },
      thursday: { open: '12:00', close: '22:00' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '22:00' },
    },
    is_open: false, // Fermé pour exemple
    is_active: true,
    delivery_fee: 250,
    minimum_order: 1800,
    preparation_time: 30,
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-06T00:00:00Z',
    distance: 2.1,
    rating: 4.6,
    totalReviews: 195,
  },
  {
    id: 'rest-007',
    owner_id: 'owner-007',
    name: 'Grill House',
    description: 'Viandes grillées et brochettes',
    city: 'Alger',
    address: '159 Avenue Houari Boumediene, Alger',
    latitude: 36.7520,
    longitude: 3.0580,
    phone_number: '+213 555 0007',
    logo_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    opening_hours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '00:00' },
      saturday: { open: '11:00', close: '00:00' },
      sunday: { open: '11:00', close: '23:00' },
    },
    is_open: true,
    is_active: true,
    delivery_fee: 300,
    minimum_order: 2000,
    preparation_time: 40,
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-01-07T00:00:00Z',
    distance: 0.5,
    rating: 4.8,
    totalReviews: 567,
  },
  {
    id: 'rest-008',
    owner_id: 'owner-008',
    name: 'Sweet Dreams',
    description: 'Pâtisseries et desserts gourmands',
    city: 'Alger',
    address: '753 Rue des Frères Bellili, Alger',
    latitude: 36.7490,
    longitude: 3.0530,
    phone_number: '+213 555 0008',
    logo_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
    opening_hours: {
      monday: { open: '09:00', close: '21:00' },
      tuesday: { open: '09:00', close: '21:00' },
      wednesday: { open: '09:00', close: '21:00' },
      thursday: { open: '09:00', close: '21:00' },
      friday: { open: '09:00', close: '22:00' },
      saturday: { open: '09:00', close: '22:00' },
      sunday: { open: '10:00', close: '20:00' },
    },
    is_open: true,
    is_active: true,
    delivery_fee: 180,
    minimum_order: 1000,
    preparation_time: 20,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z',
    distance: 1.5,
    rating: 4.9,
    totalReviews: 423,
  },
]
}