// ========== hooks/useRestaurantsByCategory.ts ==========
import type { Product, Restaurant } from '@/database.types';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAsyncState } from './useAsyncState';

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
  
  // Fonction pour fetch les restaurants par catégorie
  const fetchRestaurantsByCategory = async (): Promise<RestaurantWithProducts[]> => {
    if (!categoryName) {
      return [];
    }

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

      return filteredRestaurants;
    } else {
      return [];
    }
  };

  // Utiliser useAsyncState pour la gestion loading/error/data
  const { data: restaurants, loading: isLoading, error, execute: refetch } = useAsyncState(fetchRestaurantsByCategory);

  // Refetch quand categoryName change
  useEffect(() => {
    refetch();
  }, [categoryName]);

  return {
    restaurants: restaurants || [],
    isLoading,
    error,
    refetch,
  };
}