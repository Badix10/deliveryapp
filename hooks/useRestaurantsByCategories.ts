// ========== hooks/useRestaurantsByCategory.ts ==========
import type { Product, Restaurant } from '@/database.types';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface RestaurantWithProducts extends Restaurant {
  products?: Product[];
}

interface UseRestaurantsByCategoryResult {
  restaurants: RestaurantWithProducts[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRestaurantsByCategory(
  categoryName: string | null
): UseRestaurantsByCategoryResult {
  const [restaurants, setRestaurants] = useState<RestaurantWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    if (!categoryName) {
      setRestaurants([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // D'abord, obtenir les IDs des catégories avec ce nom
      const { data: categories, error: catError } = await supabase
        .from('product_categories')
        .select('id, restaurant_id')
        .eq('name', categoryName)
        .eq('is_active', true);

      if (catError) throw catError;

      if (categories && categories.length > 0) {
        // Obtenir les restaurant_ids uniques
        const restaurantIds = [...new Set(categories.map(cat => cat.restaurant_id))];
        
        // Récupérer les restaurants avec leurs produits
        const { data: restaurantsData, error: restError } = await supabase
          .from('restaurants')
          .select(`
            *,
            products:products(
              *,
              category:product_categories(*)
            )
          `)
          .in('id', restaurantIds)
          .eq('is_active', true)
          .eq('is_open', true);

        if (restError) throw restError;

        // Filtrer les produits pour ne garder que ceux de la catégorie sélectionnée
        const filteredRestaurants = restaurantsData?.map(restaurant => ({
          ...restaurant,
          products: restaurant.products?.filter(
            (product: any) => product.category?.name === categoryName
          ),
        })) || [];

        setRestaurants(filteredRestaurants);
      } else {
        setRestaurants([]);
      }
      
    } catch (err) {
      console.error('Error fetching restaurants by category:', err);
      
      // Fallback sur des données simulées
      const mockRestaurants: RestaurantWithProducts[] = [
        {
          id: 'rest-001',
          owner_id: 'owner-001',
          name: 'Burger Palace',
          description: 'Les meilleurs burgers de la ville',
          city: 'Alger',
          address: '123 Rue Didouche Mourad, Alger',
          latitude: 36.7538,
          longitude: 3.0588,
          phone_number: '+213 555 0001',
          logo_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200',
          opening_hours: null,
          is_open: true,
          is_active: true,
          delivery_fee: 200,
          minimum_order: 1000,
          preparation_time: 25,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          products: [],
        },
      ];
      
      setRestaurants(mockRestaurants);
      setError('Using offline data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [categoryName]);

  return {
    restaurants,
    isLoading,
    error,
    refetch: fetchRestaurants,
  };
}