import type { ProductCategory } from '@/database.types';

// Extension du type pour inclure les styles
interface CategoryWithStyle extends ProductCategory {
  icon: string;
  color: string;
  restaurantCount: number;
}

export const mockCategories: CategoryWithStyle[] = [
  {
    id: 'cat-001',
    restaurant_id: 'rest-001',
    name: 'Burgers',
    name_ar: 'برجر',
    name_en: 'Burgers',
    display_order: 1,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍔',
    color: '#FEF3C7',
    restaurantCount: 24,
  },
  {
    id: 'cat-002',
    restaurant_id: 'rest-002',
    name: 'Pizza',
    name_ar: 'بيتزا',
    name_en: 'Pizza',
    display_order: 2,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍕',
    color: '#FED7D7',
    restaurantCount: 18,
  },
  {
    id: 'cat-003',
    restaurant_id: 'rest-003',
    name: 'Sushi',
    name_ar: 'سوشي',
    name_en: 'Sushi',
    display_order: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍣',
    color: '#E0E7FF',
    restaurantCount: 12,
  },
  {
    id: 'cat-004',
    restaurant_id: 'rest-004',
    name: 'Salades',
    name_ar: 'سلطات',
    name_en: 'Salads',
    display_order: 4,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🥗',
    color: '#D1FAE5',
    restaurantCount: 15,
  },
  {
    id: 'cat-005',
    restaurant_id: 'rest-005',
    name: 'Pâtes',
    name_ar: 'معكرونة',
    name_en: 'Pasta',
    display_order: 5,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍝',
    color: '#FFE4E6',
    restaurantCount: 20,
  },
  {
    id: 'cat-006',
    restaurant_id: 'rest-006',
    name: 'Desserts',
    name_ar: 'حلويات',
    name_en: 'Desserts',
    display_order: 6,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍰',
    color: '#F3E8FF',
    restaurantCount: 22,
  },
  {
    id: 'cat-007',
    restaurant_id: 'rest-007',
    name: 'Poulet',
    name_ar: 'دجاج',
    name_en: 'Chicken',
    display_order: 7,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍗',
    color: '#FEE2E2',
    restaurantCount: 28,
  },
  {
    id: 'cat-008',
    restaurant_id: 'rest-008',
    name: 'Fruits de mer',
    name_ar: 'مأكولات بحرية',
    name_en: 'Seafood',
    display_order: 8,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🦐',
    color: '#DBEAFE',
    restaurantCount: 10,
  },
  {
    id: 'cat-009',
    restaurant_id: 'rest-009',
    name: 'Tacos',
    name_ar: 'تاكو',
    name_en: 'Tacos',
    display_order: 9,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🌮',
    color: '#FFEDD5',
    restaurantCount: 16,
  },
  {
    id: 'cat-010',
    restaurant_id: 'rest-010',
    name: 'Sandwichs',
    name_ar: 'سندويشات',
    name_en: 'Sandwiches',
    display_order: 10,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🥪',
    color: '#FEF3C7',
    restaurantCount: 25,
  },
  {
    id: 'cat-011',
    restaurant_id: 'rest-011',
    name: 'Grillades',
    name_ar: 'مشويات',
    name_en: 'Grilled',
    display_order: 11,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍖',
    color: '#FECACA',
    restaurantCount: 19,
  },
  {
    id: 'cat-012',
    restaurant_id: 'rest-012',
    name: 'Petit-déjeuner',
    name_ar: 'فطور',
    name_en: 'Breakfast',
    display_order: 12,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🥐',
    color: '#FED7AA',
    restaurantCount: 14,
  },
];

// Catégories supplémentaires si besoin
export const additionalCategories: CategoryWithStyle[] = [
  {
    id: 'cat-013',
    restaurant_id: 'rest-013',
    name: 'Végétarien',
    name_ar: 'نباتي',
    name_en: 'Vegetarian',
    display_order: 13,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🥬',
    color: '#BBF7D0',
    restaurantCount: 11,
  },
  {
    id: 'cat-014',
    restaurant_id: 'rest-014',
    name: 'Boissons',
    name_ar: 'مشروبات',
    name_en: 'Drinks',
    display_order: 14,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🥤',
    color: '#BFDBFE',
    restaurantCount: 30,
  },
  {
    id: 'cat-015',
    restaurant_id: 'rest-015',
    name: 'Glaces',
    name_ar: 'آيس كريم',
    name_en: 'Ice Cream',
    display_order: 15,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍦',
    color: '#FCE7F3',
    restaurantCount: 13,
  },
  {
    id: 'cat-016',
    restaurant_id: 'rest-016',
    name: 'Traditionnel',
    name_ar: 'تقليدي',
    name_en: 'Traditional',
    display_order: 16,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍲',
    color: '#FEF9C3',
    restaurantCount: 21,
  },
  {
    id: 'cat-017',
    restaurant_id: 'rest-017',
    name: 'Crêpes',
    name_ar: 'كريب',
    name_en: 'Crepes',
    display_order: 17,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🥞',
    color: '#FFEDD5',
    restaurantCount: 9,
  },
  {
    id: 'cat-018',
    restaurant_id: 'rest-018',
    name: 'Soupes',
    name_ar: 'شوربات',
    name_en: 'Soups',
    display_order: 18,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    icon: '🍵',
    color: '#DCFCE7',
    restaurantCount: 7,
  },
];

// Fonction helper pour obtenir une catégorie par nom
export function getCategoryByName(name: string): CategoryWithStyle | undefined {
  return mockCategories.find(cat => 
    cat.name === name || 
    cat.name_en === name || 
    cat.name_ar === name
  );
}

// Fonction pour obtenir les catégories les plus populaires
export function getTopCategories(limit: number = 6): CategoryWithStyle[] {
  return [...mockCategories]
    .sort((a, b) => b.restaurantCount - a.restaurantCount)
    .slice(0, limit);
}

// Fonction pour obtenir les catégories par langue
export function getCategoriesWithTranslation(language: 'fr' | 'en' | 'ar' = 'fr'): CategoryWithStyle[] {
  return mockCategories.map(cat => ({
    ...cat,
    displayName: language === 'en' ? cat.name_en : 
                 language === 'ar' ? cat.name_ar : 
                 cat.name
  } as CategoryWithStyle & { displayName: string | null }));
}