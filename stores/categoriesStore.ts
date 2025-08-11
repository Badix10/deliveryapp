// ========== stores/categoriesStore.ts ==========
import type { ProductCategory } from '@/database.types';
import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Type étendu pour les catégories avec icônes et couleurs
interface CategoryWithStyle extends ProductCategory {
  icon: string;
  color: string;
  restaurantCount: number;
}

interface CategoriesStore {
  categories: CategoryWithStyle[];
  isLoading: boolean;
  error: string | null;
  selectedCategoryName: string | null;
  
  // Actions
  fetchCategories: () => Promise<void>;
  selectCategory: (categoryName: string | null) => void;
  clearSelection: () => void;
}

// Mapping des icônes et couleurs par nom de catégorie
const categoryStyles: Record<string, { icon: string; color: string }> = {
  'Burgers': { icon: '🍔', color: '#FEF3C7' },
  'Pizza': { icon: '🍕', color: '#FED7D7' },
  'Sushi': { icon: '🍣', color: '#E0E7FF' },
  'Salades': { icon: '🥗', color: '#D1FAE5' },
  'Pâtes': { icon: '🍝', color: '#FFE4E6' },
  'Desserts': { icon: '🍰', color: '#F3E8FF' },
  'Poulet': { icon: '🍗', color: '#FEE2E2' },
  'Fruits de mer': { icon: '🦐', color: '#DBEAFE' },
  'Sandwichs': { icon: '🥪', color: '#FEF3C7' },
  'Tacos': { icon: '🌮', color: '#FFEDD5' },
  'Grillades': { icon: '🍖', color: '#FEE2E2' },
  'Végétarien': { icon: '🥬', color: '#D1FAE5' },
  // Fallback
  'default': { icon: '🍽️', color: '#F3F4F6' },
};

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  selectedCategoryName: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Requête Supabase réelle - récupérer toutes les catégories uniques
      const { data, error } = await supabase
        .from('product_categories')
        .select(`
          id,
          name,
          name_ar,
          name_en,
          display_order,
          is_active,
          restaurant_id,
          created_at
        `)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      if (data) {
        // Grouper les catégories par nom pour obtenir des catégories uniques
        const categoryMap = new Map<string, CategoryWithStyle>();
        
        data.forEach((category) => {
          const categoryName = category.name;
          
          if (!categoryMap.has(categoryName)) {
            // Obtenir le style pour cette catégorie
            const style = categoryStyles[categoryName] || categoryStyles['default'];
            
            categoryMap.set(categoryName, {
              ...category,
              icon: style.icon,
              color: style.color,
              restaurantCount: 1,
            });
          } else {
            // Incrémenter le nombre de restaurants pour cette catégorie
            const existing = categoryMap.get(categoryName)!;
            existing.restaurantCount += 1;
          }
        });
        
        // Convertir en tableau et trier par nombre de restaurants
        const uniqueCategories = Array.from(categoryMap.values())
          .sort((a, b) => b.restaurantCount - a.restaurantCount)
          .slice(0, 10); // Limiter à 10 catégories les plus populaires
        
        set({ 
          categories: uniqueCategories,
          isLoading: false,
          error: null,
        });
      }
      
    } catch (error) {
      console.error('Error fetching categories:', error);
      
      // Fallback sur des données simulées en cas d'erreur
      const fallbackCategories: CategoryWithStyle[] = [
        {
          id: 'cat-001',
          restaurant_id: 'rest-001',
          name: 'Burgers',
          name_ar: 'برجر',
          name_en: 'Burgers',
          display_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          icon: '🍔',
          color: '#FEF3C7',
          restaurantCount: 5,
        },
        {
          id: 'cat-002',
          restaurant_id: 'rest-002',
          name: 'Pizza',
          name_ar: 'بيتزا',
          name_en: 'Pizza',
          display_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          icon: '🍕',
          color: '#FED7D7',
          restaurantCount: 3,
        },
        {
          id: 'cat-003',
          restaurant_id: 'rest-003',
          name: 'Sushi',
          name_ar: 'سوشي',
          name_en: 'Sushi',
          display_order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          icon: '🍣',
          color: '#E0E7FF',
          restaurantCount: 2,
        },
      ];
      
      set({ 
        categories: fallbackCategories,
        error: 'Using offline data',
        isLoading: false,
      });
    }
  },

  selectCategory: (categoryName) => {
    set({ selectedCategoryName: categoryName });
  },

  clearSelection: () => {
    set({ selectedCategoryName: null });
  },
}));